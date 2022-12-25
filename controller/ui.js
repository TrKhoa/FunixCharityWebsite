const { validationResult } = require("express-validator");
const moment = require("moment");
const User = require("../model/User");
const Campaign = require("../model/Campaign");

exports.getDashboard = (req, res, next) => {
    res.render("dashboard", {
        name: req.session.name,
        image: req.session.image,
        pageTitle: "Dashboard",
        errorMessage: "errorMessage",
    });
};

exports.getUser = (req, res, next) => {
    User.find().then((user) => {
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
};

exports.getUserAdd = (req, res, next) => {
    res.render("user/userAdd", {
        name: req.session.name,
        image: req.session.image,
        user: "",
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
        const { name, username, email, password, type } = req.body;
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
                    password: password,
                    email: email,
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
    const username = req.params.user || "";
    User.findOne({ username: username }).then((user) => {
        if (user) {
            res.render("user/userAdd", {
                name: req.session.name,
                image: req.session.image,
                user: user,
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
            const { name, username, type } = req.body;
            const filter = { username: user };
            const update = {
                name: name,
                username: username,
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

exports.getCampaigns = (req, res, next) => {
    const page = req.query.page || 1;
    const itemsPerPage = 6;
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
    res.render("campaign/campaignAdd", {
        name: req.session.name,
        image: req.session.image,
        today: moment().format("YYYY-MM-DD"),
        campaign: "",
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
    Campaign.findById(id).then((campaign) => {
        if (campaign) {
            res.render("campaign/campaignAdd", {
                name: req.session.name,
                image: req.session.image,
                today: false,
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
