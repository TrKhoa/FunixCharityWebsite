const dateFormat = require("dateformat");
const { sendMail } = require("../../util/mailer");
const bcrypt = require("bcrypt");
const sha256 = require("sha256");
const User = require("../../model/User");
const Campaign = require("../../model/Campaign");

exports.postRegister = async (req, res) => {
    try {
        const userInfo = req.body.data;
        const validUsername = userInfo.username
            .toLowerCase()
            .split(" ")
            .join("");
        await User.findOne({ username: validUsername }).then((userExist) => {
            if (!userExist) {
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
                user.save()
                    .then((e) => {
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

exports.isLogin = async (req, res) => {
    if (req.session.user) {
        res.send({ data: req.session.user, isLogin: true });
    } else {
        res.send({ data: "", isLogin: false });
    }
};

exports.postLogin = async (req, res) => {
    let getCookie = undefined;
    if (req.get("Cookie")) getCookie = req.get("Cookie").split(";");
    else getCookie = [];
    const { username, password } = req.body;
    const validUsername = username.toLowerCase().split(" ").join("");
    await User.findOne({ username: validUsername })
        .then((user) => {
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

exports.postPasswordReset = async (req, res) => {
    const username = req.params.user;
    User.findOne({ username: username }).then((user) => {
        if (user) {
            bcrypt
                .hash(username, parseInt(process.env.SALT_ROUNDS))
                .then((hashedUsername) => {
                    sendMail(
                        user.email,
                        "Yêu cầu đổi mật khẩu",
                        `<b>Hãy nhấn vào <a href="${process.env.APP_URL}/forgotPassword?username=${username}&token=${hashedUsername}">Link này</a> để khôi phục mật khẩu</b>`
                    );
                    res.send({ message: "Vui lòng kiểm tra Email" });
                });
        } else {
            res.send({ message: "Username không tồn tại" });
        }
    });
};

exports.getForgotPassword = async (req, res) => {
    const { username, token } = req.query;
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

exports.postForgotPassword = async (req, res) => {
    const { username, password, token } = req.body.data;
    bcrypt.compare(username, token, (err, result) => {
        if (result == true) {
            const filter = { username: username };
            const update = { password: sha256(password) };
            User.findOneAndUpdate(filter, update).then((result) => {
                if (result) {
                    res.redirect(process.env.CLIENT_URI + "/login");
                } else {
                    res.redirect(process.env.CLIENT_URI);
                }
            });
        } else {
            res.redirect(process.env.CLIENT_URI);
        }
    });
};

exports.isLogout = (req, res, next) => {
    req.session.destroy();
    return res.status(201).send({ data: "", error: false });
};

exports.postChangePassword = (req, res, next) => {
    const { username, password } = req.body;
    if (username === "") {
        res.redirect("/admin/user");
    } else {
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

exports.postUpdateProfile = (req, res, next) => {
    const { username, name, phone, email } = req.body;
    const img = req.file;
    console.log(req.body);
    if (username === "") {
        res.redirect("/admin/user");
    } else {
        const imgPath = img ? img.path.substr(6) : req.session.user.image;
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
