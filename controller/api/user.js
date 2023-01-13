const dateFormat = require("dateformat");
const { sendMail } = require("../../util/mailer");
const bcrypt = require("bcrypt");
const sha256 = require("sha256");
const User = require("../../model/User");
const Campaign = require("../../model/Campaign");

//Gửi yêu cầu đăng ký
exports.postRegister = async (req, res) => {
    try {
        //Lấy thông tin từ phía Front
        const userInfo = req.body.data;
        //Chỉnh sửa username thành 1 username hợp lệ
        const validUsername = userInfo.username
            .toLowerCase()
            .split(" ")
            .join("");
        await User.findOne({ username: validUsername }).then((userExist) => {
            if (!userExist) {
                //Tạo mật khẩu ngẫu nhiên
                let length = 12;
                const characters = "abcdefghijklmnopqrstuvwxyz";
                let result = "";
                const charactersLength = characters.length;
                for (let i = 0; i < length; i++) {
                    result += characters.charAt(
                        Math.floor(Math.random() * charactersLength)
                    );
                }
                const user = new User({
                    ...userInfo,
                    username: validUsername,
                    password: sha256(result),
                });
                //Lưu người dùng
                user.save()
                    .then((e) => {
                        //Gửi Email chứa Password
                        sendMail(
                            user.email,
                            "Cảm ơn bạn đã đăng ký, mật khẩu của bạn là:",
                            "<b>Mật khẩu mới của bạn là: " + result + "</b>"
                        );
                        return res.status(201).send({
                            error: false,
                            message:
                                "Tạo user thành công, xin hãy kiểm tra email của bạn để nhận mật khẩu",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                return res
                    .status(202)
                    .send({ error: true, message: "Username đã tồn tại" });
            }
        });
    } catch (err) {
        console.error(err);
    }
};

//Gửi yêu cầu kiểm tra đã đăng nhập chưa
exports.isLogin = async (req, res) => {
    //Kiểm tra Session xem đã đăng nhập chưa
    if (req.session.user) {
        res.send({ data: req.session.user, isLogin: true });
    } else {
        res.send({ data: "", isLogin: false });
    }
};

//Gửi yêu cầu đăng nhập
exports.postLogin = async (req, res) => {
    /*
    let getCookie = undefined;
    if (req.get("Cookie")) getCookie = req.get("Cookie").split(";");
    else getCookie = [];
    */
   //Lấy thông tin từ phía Front
    const { username, password } = req.body;
    const validUsername = username.toLowerCase().split(" ").join("");
    await User.findOne({ username: validUsername })
        .then((user) => {
            //Nếu thông tin đăng nhập là đúng thì tạo session hoặc báo lỗi nếu sai thông tin đăng nhập
            if (user) {
                if (user.password === sha256(password)) {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return res.status(201).send({ data: user, error: false });
                } else {
                    return res.status(202).send({
                        error: true,
                        message: "Mật khẩu hoặc tài khoản không đúng!",
                    });
                }
            } else {
                return res.status(202).send({
                    error: true,
                    message: "Mật khẩu hoặc tài khoản không đúng!",
                });
            }
        })
        .catch((err) => {
            console.error(err);
        });
};

//Gửi yêu cầu quên Password
exports.postPasswordReset = async (req, res) => {
    const username = req.params.user;//Lấy username
    User.findOne({ username: username }).then((user) => {
        //Nếu tồn tại user thì tạo Mail chứa link thay đổi password
        if (user) {
            //Tạo Token và gửi Mail
            bcrypt
                .hash(username, parseInt(process.env.SALT_ROUNDS))
                .then((hashedUsername) => {
                    sendMail(
                        user.email,
                        "Yêu cầu đổi mật khẩu",
                        `<b>Hãy nhấn vào <a href="${process.env.APP_URL}/forgotPassword?username=${username}&token=${hashedUsername}">Link này</a> để khôi phục mật khẩu</b>`
                    );
                    res.send({ message: "Yêu cầu thay đổi mật khẩu thành công, vui lòng kiểm tra Email" });
                });
        } else {
            res.send({ message: "Username không tồn tại" });
        }
    });
};

//Điều hướng đến trang thay đổi mật khẩu sau khi xác thực link yêu cầu quên Password
exports.getForgotPassword = async (req, res) => {
    //Lấy thông tin
    const { username, token } = req.query;
    //Kiếm tra Username và Token, nếu hợp lệ sẽ đưa đến trang thay đổi mật khẩu
    bcrypt.compare(username, token, (err, result) => {
        if (result == true) {
            res.redirect(
                `${process.env.CLIENT_URI}/forgotPassword?username=${username}&token=${token}`
            );
        } else {
            res.redirect(process.env.CLIENT_URI);
        }
    });
};

//Gửi yêu cầu thay đổi mật khẩu từ link yêu cầu quên password
exports.postForgotPassword = async (req, res) => {
    //Lấy thông tin từ phía Front
    const { username, password, token } = req.body.data;
    //Kiểm tra tính hợp lệ của Token và thực hiện lưu thông tin vào MongoDB
    bcrypt.compare(username, token, (err, result) => {
        if (result == true) {
            const filter = { username: username };
            const update = { password: sha256(password) };
            User.findOneAndUpdate(filter, update).then((result) => {
                if (result) {
                    res.send({ message: "Thay đổi mật khẩu thành công" });
                } else {
                    res.send({ message: "Thay đổi mật khẩu thất bại" });
                }
            });
        } else {
            res.redirect(process.env.CLIENT_URI);
        }
    });
};

//Gửi yêu cầu đăng xuất
exports.isLogout = (req, res, next) => {
    //Hủy Session đăng nhập và đăng xuất tài khoản ở Front
    req.session.destroy();
    return res.status(201).send({ data: "", error: false });
};

//Gửi yêu cầu thay đổi mật khẩu
exports.postChangePassword = (req, res, next) => {
    //Lấy thông tin từ phía Front
    const { username, password } = req.body;
    if (username === "") {
        res.redirect("/admin/user");
    } else {
        //Cập nhật password mới cho user
        User.findOneAndUpdate(
            { username: username },
            { password: password }
        ).then((result) => {
            if (result) {
                const newUser = { ...req.session.user, password: password };
                req.session.user = newUser;
                return res.status(201).send({
                    error: false,
                    message: "Thay đổi password thành công",
                    user: newUser,
                });
            } else {
                return res.status(201).send({
                    error: true,
                    message: "Thay đổi password thất bại",
                });
            }
        });
    }
};

//Gửi yêu cầu thay đổi thông tin tài khoản
exports.postUpdateProfile = (req, res, next) => {
    //Lấy thông tin từ phía Front
    const { username, name, phone, email } = req.body;
    const img = req.file;
    if (username === "") {
        res.redirect("/admin/user");
    } else {
        const imgPath = img ? img.path.substr(6) : req.session.user.image;//Kiểm tra thông tin về hình ảnh
        //Cập nhật thông tin tài khoản cho User
        const update = { name: name, phone: phone, email: email, image: imgPath };
        User.findOneAndUpdate(
            { username: username },
            update
        ).then((result) => {
            if (result) {
                const newUser = {...req.session.user, name: name, email: email, image: imgPath}
                req.session.user = newUser;
                return res.status(201).send({
                    error: false,
                    message: "Thay đổi Profile thành công",
                    user: newUser,
                });
            } else {
                return res.status(201).send({
                    error: true,
                    message: "Thay đổi Profile thất bại",
                });
            }
        });
    }
};
