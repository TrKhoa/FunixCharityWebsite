const { validationResult } = require("express-validator");
const moment = require("moment");
const { sendMail } = require("../util/mailer");
const bcrypt = require("bcrypt");
const sha256 = require("sha256");
const User = require("../model/User");
const Campaign = require("../model/Campaign");
const Sessions = require("../model/Session");
const mongoose = require("mongoose");

exports.getDashboard = (req, res, next) => {
    res.render("dashboard", {
        name: req.session.name,
        image: req.session.image,
        user: req.session.user,
        pageTitle: "Dashboard",
        errorMessage: "errorMessage",
    });
};

exports.getLogout = (req, res, next) => {
    req.session.destroy();
    res.redirect("/admin/dashboard");
};

exports.getUser = (req, res, next) => {
    const userSession = req.session.user;
    const byPhone = req.query.byPhone || false;
    const desc = req.query.desc || false;
    function sortBy() {
        if (byPhone) {
            return "phone";
        } else {
            return "username";
        }
    }
    function sortType() {
        if (desc) {
            return "-";
        } else {
            return "";
        }
    }
    /*
    const user = User.find().sort(sortType()+sortBy()).then((user) => {
        if (user) {
            res.render("user/user", {
                name: "req.session.name",
                pageTitle: "User",
                user: user,
                errorMessage: "errorMessage",
                path: "/admin/dashboard",
            });
        } else {
            res.render("user/user", {
                name: "req.session.name",
                pageTitle: "User",
                user: [],
                errorMessage: "errorMessage",
                path: "/admin/dashboard",
            });
        }
    });
    */
    const user = User.find()
        .sort(sortType() + sortBy())
        .then((user) => {
            return user ? user : [];
        });
    const onlineUser = Sessions.find().then((a) => {
        const user = [];
        a.map((val) => {
            const username = val.session.user.username;
            user.push(username);
        });
        return user;
    });
    Promise.all([user, onlineUser]).then((result) => {
        const user = result[0];
        const onlineUser = result[1];
        function isOnline(username) {
            let status = "offline";
            onlineUser.map((check) => {
                if (username == check) {
                    return (status = "online");
                }
            });
            return status;
        }
        res.render("user/user", {
            name: "req.session.name",
            pageTitle: "User",
            user: user,
            userSession: userSession,
            isOnline: isOnline,
            errorMessage: "errorMessage",
            path: "/admin/dashboard",
        });
    });
};

exports.getUserAdd = (req, res, next) => {
    const userSession = req.session.user;
    res.render("user/userAdd", {
        name: req.session.name,
        image: req.session.image,
        user: "",
        userSession: userSession,
        edit: false,
        pageTitle: "User add",
        errorMessage: "",
    });
};

exports.postUserAdd = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.render("user/userAdd", {
            name: req.session.name,
            image: req.session.image,
            user: req.body,
            edit: false,
            pageTitle: "User add",
            errorMessage: err.array()[0].msg,
        });
    } else {
        const { name, username, email, phone, password, type } = req.body;
        const validUsername = username.toLowerCase().split(" ").join("");
        console.log(validUsername);
        const filter = { username: username };
        User.findOne(filter).then((check) => {
            if (check) {
                res.render("user/userAdd", {
                    name: req.session.name,
                    image: req.session.image,
                    user: req.body,
                    edit: false,
                    pageTitle: "User add",
                    errorMessage: "Username đã tồn tại",
                });
            } else {
                const user = new User({
                    name: name,
                    username: validUsername,
                    password: sha256(password),
                    email: email,
                    phone: phone,
                    status: type,
                    donate: [],
                });
                user.save().then(() => {
                    res.redirect("/admin/user");
                });
            }
        });
    }
};

exports.getUserEdit = (req, res, next) => {
    const userSession = req.session.user;
    const username = req.params.user || "";
    User.findOne({ username: username }).then((user) => {
        if (user) {
            res.render("user/userAdd", {
                name: req.session.name,
                image: req.session.image,
                user: user,
                userSession: userSession,
                edit: true,
                pageTitle: "User",
                errorMessage: "",
            });
        } else {
            res.redirect("/admin/user");
        }
    });
};

exports.postUserEdit = (req, res, next) => {
    const user = req.params.user || "";
    if (user === "") {
        res.redirect("/admin/user");
    } else {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.render("user/userAdd", {
                name: req.session.name,
                image: req.session.image,
                user: req.body,
                edit: true,
                pageTitle: "User Edit",
                errorMessage: err.array()[0].msg,
            });
        } else {
            const { name, phone, type } = req.body;
            const filter = { username: user };
            const update = {
                name: name,
                phone: phone,
                status: type,
            };
            User.findOneAndUpdate(filter, update).then(() => {
                res.redirect("/admin/user");
            });
        }
    }
};

exports.getUserDelete = (req, res, next) => {
    const user = req.params.user || "";
    if (user === "") {
        res.redirect("/admin/user");
    } else {
        const filter = { username: user, status: { $lt: 3 } };
        User.deleteOne(filter).then(() => {
            res.redirect("/admin/user");
        });
    }
};

exports.postMultiUserDelete = (req, res, next) => {
    const username = req.body.username || false;
    if (!username) {
        res.redirect("/admin/user");
    } else {
        User.deleteMany({ username: username }).then((result) => {
            res.redirect("/admin/user");
        });
    }
};

exports.getUserPasswordGen = (req, res, next) => {
    const username = req.params.user || "";
    if (username === "") {
        res.redirect("/admin/user");
    } else {
        User.findOne({ username: username }).then((user) => {
            let length = 12;
            const characters = "abcdefghijklmnopqrstuvwxyz";
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            User.findOneAndUpdate({ username: username }, { password: sha256(result) }).then(() => {
                sendMail(
                    user.email,
                    "Thông báo về reset mật khẩu:",
                    "<b>Mật khẩu mới của bạn là: "+result+"</b>"
                );
                res.redirect("/admin/user")
            });
            
        });
    }
};

exports.getCampaigns = (req, res, next) => {
    const page = req.query.page || 1;
    const itemsPerPage = 6;
    const user = req.session.user;
    const skippedItems = (page - 1) * itemsPerPage;
    let totalItems = 0;
    Campaign.find()
        .count()
        .then((items) => {
            totalItems = items;
            const lastPage = Math.ceil(totalItems / itemsPerPage);
            if (page < 1 || page > lastPage) {
                res.redirect("/admin/campaign");
            } else {
                return Campaign.find()
                    .skip(skippedItems)
                    .limit(itemsPerPage)
                    .then((campaign) => {
                        if (campaign) {
                            res.render("campaign/campaign", {
                                name: "req.session.name",
                                pageTitle: "Campaign",
                                campaign: campaign,
                                page: parseInt(page),
                                user: user,
                                totalItems: totalItems,
                                nextPage: itemsPerPage * page < totalItems,
                                prePage: page > 1,
                                lastPage: lastPage,
                                errorMessage: "errorMessage",
                            });
                        } else {
                            res.render("campaign/campaign", {
                                name: "req.session.name",
                                pageTitle: "Campaign",
                                campaign: [],
                                errorMessage: "errorMessage",
                            });
                        }
                    });
            }
        });
};

exports.getCampaignAdd = (req, res, next) => {
    const user = req.session.user;
    res.render("campaign/campaignAdd", {
        name: req.session.name,
        image: req.session.image,
        today: moment().format("YYYY-MM-DD"),
        campaign: "",
        user: user,
        edit: false,
        pageTitle: "Campaign add",
        errorMessage: "",
    });
};

exports.postCampaignAdd = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        res.render("campaign/campaignAdd", {
            name: req.session.name,
            image: req.session.image,
            today: false,
            campaign: req.body,
            edit: false,
            pageTitle: "Campaign add",
            errorMessage: err.array()[0].msg,
        });
    } else {
        const img = req.file;
        if (img === undefined) {
            res.render("campaign/campaignAdd", {
                name: req.session.name,
                image: req.session.image,
                today: false,
                campaign: req.body,
                edit: false,
                pageTitle: "Campaign add",
                errorMessage: "Hình ảnh không được để trống",
            });
        } else {
            const { name, goal, type, desc, startAt, endAt } = req.body;
            const imgPath = img.path.substr(6);
            const campaign = new Campaign({
                name: name,
                raise: 0,
                goal: goal,
                image: imgPath,
                type: type,
                desc: desc,
                startAt: startAt,
                endAt: endAt,
                donator: [],
            });
            campaign.save().then(() => {
                res.redirect("/admin/campaign");
            });
        }
    }
};

exports.getCampaignEdit = (req, res, next) => {
    const id = req.params.id || "";
    const user = req.session.user;
    Campaign.findById(id).then((campaign) => {
        if (campaign) {
            res.render("campaign/campaignAdd", {
                name: req.session.name,
                image: req.session.image,
                today: false,
                user: user,
                campaign: campaign,
                edit: true,
                pageTitle: "Campaign Edit",
                errorMessage: "",
            });
        } else {
            res.redirect("/admin/campaign");
        }
    });
};

exports.postCampaignEdit = (req, res, next) => {
    const id = req.params.id || "";
    if (id === "") {
        res.redirect("/admin/campaign");
    } else {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.render("campaign/campaignAdd", {
                name: req.session.name,
                image: req.session.image,
                today: false,
                campaign: req.body,
                edit: true,
                pageTitle: "Campaign Edit",
                errorMessage: err.array()[0].msg,
            });
        } else {
            const { name, goal, image, type, startAt, endAt, desc } = req.body;
            const img = req.file;
            const imgPath = img ? img.path.substr(6) : image;
            const filter = { _id: id };
            const update = {
                name: name,
                goal: goal,
                image: imgPath,
                type: type,
                desc: desc,
                startAt: startAt,
                endAt: endAt,
            };
            Campaign.findOneAndUpdate(filter, update).then(() => {
                res.redirect("/admin/campaign");
            });
        }
    }
};

exports.getCampaignDelete = (req, res, next) => {
    const id = req.params.id || "";
    if (id === "") {
        res.redirect("/admin/campaign");
    } else {
        const filter = { _id: id };
        Campaign.deleteOne(filter).then(() => {
            res.redirect("/admin/campaign");
        });
    }
};
