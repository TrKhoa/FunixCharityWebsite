const config = require("config");
const dateFormat = require("dateformat");

const User = require("../model/User");
const Campaign = require("../model/Campaign");

exports.postRegister = async (req, res) => {
    try {
        const userInfo = req.body.data;
        const validUsername = userInfo.username.toLowerCase().split(" ").join("");
        await User.findOne({ username: validUsername }).then(
            (userExist) => {
                if (!userExist) {
                    const user = new User({...userInfo, username: validUsername});
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

exports.isLogin = async (req, res) => {
    if (req.session.user) {
        res.send({ data: req.session.user, isLogin: true });
    } else {
        res.send({ data: [], isLogin: false });
    }
};

exports.postLogin = async (req, res) => {
    let getCookie = undefined;
    if (req.get("Cookie")) getCookie = req.get("Cookie").split(";");
    else getCookie = [];
    const {username,password} = req.body;
    const validUsername = username.toLowerCase().split(" ").join("");
    await User.findOne({ username: validUsername })
        .then((user) => {
            if (user) {
                if (user.password === password) {
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

exports.postLoginREF = (req, res, next) => {
    let getCookie = undefined;
    if (req.get("Cookie")) getCookie = req.get("Cookie").split(";");
    else getCookie = [];
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username: username })
        .then((user) => {
            if (!user) {
                return res.status(422).render("MH-6/login", {
                    pageTitle: "Login",
                    userRoll: 0,
                    path: "/MH-6",
                    oldInput: {
                        username: username,
                    },
                    isAuthenticated: false,
                    errorMessage: "Username không tồn tại",
                });
            }
            if (user.password == password) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return res.redirect(lastPage);
            }
            return res.status(422).render("MH-6/login", {
                pageTitle: "Login",
                userRoll: 0,
                path: "/MH-6",
                oldInput: {
                    username: username,
                },
                isAuthenticated: false,
                errorMessage: "Sai tài khoản hoặc mật khẩu",
            });
        })
        .catch((err) => console.log(err));
};
