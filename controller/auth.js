const config = require("config");
const dateFormat = require("dateformat");

const User = require("../model/User");
const Campaign = require("../model/Campaign");

exports.postRegister = async (req, res) => {
    try {
        const userInfo = req.body.data;
        await User.findOne({ username: userInfo.username }).then(
            (userExist) => {
                if (!userExist) {
                    const user = new User(userInfo);
                    user.save()
                        .then((e) => {
                            return res.status(201).send({
                                error: false,
                                message:
                                    "Tạo user thành công, xin hãy đăng nhập lại",
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
            }
        );
    } catch (err) {
        console.error(err);
    }
};

exports.postLogin = async (req, res) => {
    const userInfo = req.body;
    await User.findOne({ username: userInfo.username })
        .then((user) => {
            if (user) {
                if (user.password === userInfo.password) {
                    return res.status(201).send({data: user, error: false});
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