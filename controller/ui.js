const { validationResult } = require("express-validator");
const moment = require("moment");
const { sendMail } = require("../util/mailer");
const bcrypt = require("bcrypt");
const sha256 = require("sha256");
const User = require("../model/User");
const Campaign = require("../model/Campaign");
const Sessions = require("../model/Session");
const mongoose = require("mongoose");

//Truy cập Dashboard
exports.getDashboard = (req, res, next) => {
    const userSession = req.session.user; // Lấy session của user
    //Lấy dữ liệu từ MongoDB
    const campaign = Campaign.find()
        .sort([["_id", -1]])
        .then((result) => {
            return result ? result : [];
        });
    const user = User.find().then((user) => {
        return user ? user : [];
    });
    //Hàm kiểm tra User đang online
    const onlineUser = Sessions.find().then((a) => {
        const user = [];
        a.map((val) => {
            const username = val.session.user.username;
            user.push(username);
        });
        return user;
    });
    //Trả kết quả về Dashboard sau khi lấy được dữ liệu
    Promise.all([user, onlineUser, campaign]).then((result) => {
        const user = result[0];
        const onlineUser = result[1];
        const campaign = result[2];
        function isOnline(username) {
            let status = "offline";
            onlineUser.map((check) => {
                if (username == check) {
                    return (status = "online");
                }
            });
            return status;
        }
        res.render("dashboard", {
            userSession: userSession,
            campaign: result[2],
            user: user,
            isOnline: isOnline,
            pageTitle: "Dashboard",
            errorMessage: "errorMessage",
        });
    });
};

//Gửi yêu cầu đăng xuất
exports.getLogout = (req, res, next) => {
    //Hủy Session
    req.session.destroy();
    res.redirect("/admin/dashboard");
};

//Truy cập trang quản lý User
exports.getUser = (req, res, next) => {
    //Lấy dữ liệu
    const byPhone = req.query.byPhone || false;
    const desc = req.query.desc || false;
    //Tạo hàm sắp xếp
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

    //Sử dụng hàm sắp xếp để tạo bộ lọc dữ liệu và lấy dữ liệu
    const user = User.find({ status: { $gt: -1 } })
        .sort(sortType() + sortBy())
        .then((user) => {
            return user ? user : [];
        });
    //Hàm kiểm tra User đang online
    const onlineUser = Sessions.find().then((a) => {
        const user = [];
        a.map((val) => {
            const username = val.session.user.username;
            user.push(username);
        });
        return user;
    });
    const totalItems = User.find({ status: { $gt: -1 } })
        .count()
        .then((user) => {
            return user ? user : 0;
        });
    //Trả về kết quả sau khi lấy dược dữ liệu
    Promise.all([user, onlineUser, totalItems]).then((result) => {
        const user = result[0];
        const onlineUser = result[1];
        const totalItems = result[2];
        const page = req.query.page || 1;
        const itemsPerPage = 12;
        const limitItems = itemsPerPage * page;
        const userSession = req.session.user;
        const skippedItems = (page - 1) * itemsPerPage;
        const lastPage = Math.ceil(totalItems / itemsPerPage);
        const getUser = user.slice(skippedItems, limitItems);

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
            search: false,
            pageTitle: "User",
            userSession: userSession,
            page: parseInt(page),
            totalItems: totalItems,
            nextPage: itemsPerPage * page < totalItems,
            prePage: page > 1,
            lastPage: lastPage,
            user: getUser,
            isOnline: isOnline,
            errorMessage: req.flash("success"),
            path: "/admin/dashboard",
        });
    });
};

//Truy cập phần tìm kiếm user
exports.getUserSearch = (req, res, next) => {
    const userSearch = req.body.search || req.cookies.search;
    req.cookies.search = res.cookie('search',userSearch);
    console.log(req.cookies.search )
    const onlineUser = Sessions.find().then((a) => {
        const user = [];
        a.map((val) => {
            const username = val.session.user.username;
            user.push(username);
        });
        return user;
    });
    const user = User.find({status: {$gt: -1}})
        .then((val) => {
            const results = [];
            val.map((value) => {
                const checkValue = userSearch.toLowerCase().split(" ");
                const userName = value.name.toLowerCase().split(" ");
                userName.some((check) => {
                    if (checkValue.includes(check)) {
                        if (results.indexOf(value) === -1) {
                            return results.push(value);
                        }
                    }
                });
            });
            return results;
        })
        Promise.all([user,onlineUser]).then((val) => {
            const userData = val[0];
            const onlineUser = val[1];
            const totalItems = userData.length;
            const page = parseInt(req.query.page) || 1;
            const itemsPerPage = 12;
            const userSession = req.session.user;
            const limitItems = itemsPerPage * page;
            const skippedItems = (page - 1) * itemsPerPage;
            const lastPage = Math.ceil(totalItems / itemsPerPage);
            const userSlice = userData.slice(skippedItems, limitItems);

            function isOnline(username) {
                let status = "offline";
                onlineUser.map((check) => {
                    if (username == check) {
                        return (status = "online");
                    }
                });
                return status;
            }

            if (user) {
                res.render("user/user", {
                    search: true,
                    userSession: userSession,
                    pageTitle: "user",
                    user: userSlice,
                    isOnline: isOnline,
                    page: parseInt(page),
                    totalItems: totalItems,
                    nextPage: itemsPerPage * page < totalItems,
                    prePage: page > 1,
                    lastPage: lastPage,
                    errorMessage: req.flash("success"),
                });
            }
        });
};

//Truy cập trang thêm User
exports.getUserAdd = (req, res, next) => {
    const userSession = req.session.user;
    res.render("user/userAdd", {
        userSession: userSession,
        user: "",
        edit: false,
        pageTitle: "User add",
        errorMessage: "",
    });
};

//Gửi yêu cầu thêm User
exports.postUserAdd = (req, res, next) => {
    const err = validationResult(req); //Lấy báo lỗi
    const userSession = req.session.user;
    //Trả về trang quản lý User nếu có lỗi hoặc tạo user nếu không có báo lỗi
    if (!err.isEmpty()) {
        res.render("user/userAdd", {
            userSession: userSession,
            user: req.body,
            edit: false,
            pageTitle: "User add",
            errorMessage: err.array()[0].msg,
        });
    } else {
        const { name, username, email, phone, password, type } = req.body;
        //Chỉnh username thành username hợp lệ
        const validUsername = username.toLowerCase().split(" ").join("");
        const filter = { username: username };
        User.findOne(filter).then((check) => {
            if (check) {
                res.render("user/userAdd", {
                    userSession: userSession,
                    user: req.body,
                    edit: false,
                    pageTitle: "User add",
                    errorMessage: "Username đã tồn tại",
                });
            } else {
                //Kiểm tra dữ liệu ảnh và thêm User
                const img = req.file || false;
                const imgPath = img ? img.path.substr(6) : "";
                const user = new User({
                    name: name,
                    username: validUsername,
                    password: sha256(password),
                    email: email,
                    image: imgPath,
                    phone: phone,
                    status: type,
                    donate: [],
                });
                user.save().then(() => {
                    req.flash("success", "Thêm User thành công");
                    res.redirect("/admin/user");
                });
            }
        });
    }
};

//Truy cập trang chỉnh sửa User
exports.getUserEdit = (req, res, next) => {
    const userSession = req.session.user;
    const username = req.params.user || "";
    //Tạo hàm điều hướng về trang User
    function notAuth() {
        res.redirect("/admin/user");
    }
    //Trả kết quả về trang chỉnh sửa User
    User.findOne({ username: username }).then((user) => {
        if (user) {
            res.render("user/userAdd", {
                userSession: userSession,
                user: user,
                edit: true,
                notAuth: notAuth,
                pageTitle: "User",
                errorMessage: "",
            });
        } else {
            res.redirect("/admin/user");
        }
    });
};

//Gửi yêu cầu chỉnh sửa User
exports.postUserEdit = (req, res, next) => {
    const user = req.params.user || "";
    const userSession = req.session.user;
    if (user === "") {
        res.redirect("/admin/user");
    } else {
        //Kiểm tra lỗi
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.render("user/userAdd", {
                userSession: userSession,
                user: req.body,
                edit: true,
                pageTitle: "User Edit",
                errorMessage: err.array()[0].msg,
            });
        } else {
            //Lấy dữ liệu và cập nhật thông tin User trên MongoDB
            const { name, phone, email, type, image } = req.body;
            const img = req.file;
            const imgPath = img ? img.path.substr(6) : image;
            const filter = { username: user };
            const update = () => {
                if(name){
                    return {
                        name: name,
                        image: imgPath,
                        email: email,
                        phone: phone,
                        status: type,
                    };
                } else {
                    return {
                        status: type,
                    }
                }
            }
            User.findOneAndUpdate(filter, update(), { new: true }).then(
                (result) => {
                    if (userSession.username == result.username) {
                        req.session.user = result;
                    }
                    req.flash("success", "Chỉnh sửa User thành công");
                    res.redirect("/admin/user");
                }
            );
        }
    }
};

//Gửi yêu cầu xóa User
exports.getUserDelete = (req, res, next) => {
    const user = req.params.user || "";
    if (user === "") {
        res.redirect("/admin/user");
    } else {
        User.findOneAndUpdate(
            { username: user },
            { status: -1 },
            { new: true }
        ).then((value) => {
            if (value.status === -1) {
                req.flash("success", "Xóa User thành công");
                res.redirect("/admin/user");
            }
        });
    }
};

//Gửi yêu cầu xóa hàng loạt nhiều User
exports.postMultiUserDelete = (req, res, next) => {
    const username = req.body.username || false;
    if (!username) {
        res.redirect("/admin/user");
    } else {
        req.flash("success", "Xóa hàng loạt User thành công");
        User.updateMany({ username: username }, { status: -1 }).then(
            (result) => {
                res.redirect("/admin/user");
            }
        );
    }
};

//Gửi yêu cầu thay đổi Password ngẫu nhiêu cho User
exports.getUserPasswordGen = (req, res, next) => {
    const username = req.params.user || "";
    if (username === "") {
        res.redirect("/admin/user");
    } else {
        User.findOne({ username: username }).then((user) => {
            //Tạo Password ngẫu nhiên
            let length = 12;
            const characters = "abcdefghijklmnopqrstuvwxyz";
            let result = "";
            const charactersLength = characters.length;
            for (let i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            //Câp nhật và gửi Mail chứa Password về cho User tương ứng
            User.findOneAndUpdate(
                { username: username },
                { password: sha256(result) }
            ).then(() => {
                sendMail(
                    user.email,
                    "Thông báo về reset mật khẩu:",
                    "<b>Mật khẩu mới của bạn là: " + result + "</b>"
                );
                res.redirect("/admin/user");
            });
        });
    }
};

//Truy cập trang quản lý Campaigns
exports.getCampaigns = (req, res, next) => {
    //Tạo trang
    const page = req.query.page || 1;
    const itemsPerPage = 6;
    const userSession = req.session.user;
    const skippedItems = (page - 1) * itemsPerPage;
    let totalItems = 0;

    //Trả kết quả về trang quản lý Campaigns
    Campaign.find({ type: { $gt: -1 } })
        .count()
        .then((items) => {
            totalItems = items;
            const lastPage = Math.ceil(totalItems / itemsPerPage);
            if (page < 1 || page > lastPage) {
                res.redirect("/admin/campaign");
            } else {
                return Campaign.find()
                    .sort([["_id", -1]])
                    .skip(skippedItems)
                    .limit(itemsPerPage)
                    .then((campaign) => {
                        if (campaign) {
                            res.render("campaign/campaign", {
                                search: false,
                                userSession: userSession,
                                pageTitle: "Campaign",
                                campaign: campaign,
                                page: parseInt(page),
                                totalItems: totalItems,
                                nextPage: itemsPerPage * page < totalItems,
                                prePage: page > 1,
                                lastPage: lastPage,
                                errorMessage: req.flash("success"),
                            });
                        } else {
                            res.render("campaign/campaign", {
                                userSession: userSession,
                                pageTitle: "Campaign",
                                campaign: [],
                                errorMessage: req.flash("success"),
                            });
                        }
                    });
            }
        });
};

exports.postCampaignsSearch = (req, res, next) => {
    const campaignSearch = req.body.search || req.cookies.search;
    req.cookies.search = res.cookie('search',campaignSearch);
    Campaign.find()
        .then((campaign) => {
            const results = [];
            campaign.map((value) => {
                const checkValue = campaignSearch.toLowerCase().split(" ");
                const campaignName = value.name.toLowerCase().split(" ");
                campaignName.some((check) => {
                    if (checkValue.includes(check)) {
                        if (results.indexOf(value) === -1) {
                            return results.push(value);
                        }
                    }
                });
            });
            return results;
        })
        .then((results) => {
            const totalItems = results.length;
            const page = parseInt(req.query.page) || 1;
            const itemsPerPage = 6;
            const userSession = req.session.user;
            const limitItems = itemsPerPage * page;
            const skippedItems = (page - 1) * itemsPerPage;
            const lastPage = Math.ceil(totalItems / itemsPerPage);
            const campaign = results.slice(skippedItems, limitItems);
            if (campaign) {
                res.render("campaign/campaign", {
                    search: true,
                    userSession: userSession,
                    pageTitle: "Campaign",
                    campaign: campaign,
                    page: parseInt(page),
                    totalItems: totalItems,
                    nextPage: itemsPerPage * page < totalItems,
                    prePage: page > 1,
                    lastPage: lastPage,
                    errorMessage: req.flash("success"),
                });
            }
        });
};

//Truy cập trang thêm Campaigns
exports.getCampaignAdd = (req, res, next) => {
    const userSession = req.session.user;
    res.render("campaign/campaignAdd", {
        name: req.session.name,
        image: req.session.image,
        today: moment().format("YYYY-MM-DD"),
        campaign: "",
        userSession: userSession,
        edit: false,
        pageTitle: "Campaign add",
        errorMessage: "",
    });
};

//Gửi yêu cầu thêm Campaigns
exports.postCampaignAdd = (req, res, next) => {
    //Kiểm tra lỗi nhập Form
    const err = validationResult(req);
    const userSession = req.session.user;
    if (!err.isEmpty()) {
        res.render("campaign/campaignAdd", {
            userSession: userSession,
            today: false,
            campaign: req.body,
            edit: false,
            pageTitle: "Campaign add",
            errorMessage: err.array()[0].msg,
        });
    } else {
        //Báo lỗi thiếu ảnh
        const img = req.file;
        if (img === undefined) {
            res.render("campaign/campaignAdd", {
                userSession: userSession,
                today: false,
                campaign: req.body,
                edit: false,
                pageTitle: "Campaign add",
                errorMessage: "Hình ảnh không được để trống",
            });
        } else {
            //Thêm Campaign
            const { name, agent, goal, type, desc, startAt, endAt } = req.body;
            const imgPath = img.path.substr(6);
            const campaign = new Campaign({
                name: name,
                agent: agent,
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
                req.flash("success", "Thêm Campaign thành công");
                res.redirect("/admin/campaign");
            });
        }
    }
};

//Truy cập trang chỉnh sửa Campaigns
exports.getCampaignEdit = (req, res, next) => {
    const id = req.params.id || ""; //Lấy ID Campaign
    const userSession = req.session.user;

    Campaign.findById(id).then((campaign) => {
        if (campaign) {
            res.render("campaign/campaignAdd", {
                today: false,
                userSession: userSession,
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

//Gửi yêu cầu chỉnh sửa Campaigns
exports.postCampaignEdit = (req, res, next) => {
    const id = req.params.id || false;
    const userSession = req.session.user;
    if (!id) {
        res.redirect("/admin/campaign");
    } else {
        //Kiểm tra lỗi
        const err = validationResult(req);
        if (!err.isEmpty()) {
            res.render("campaign/campaignAdd", {
                userSession: userSession,
                today: false,
                campaign: req.body,
                edit: true,
                pageTitle: "Campaign Edit",
                errorMessage: err.array()[0].msg,
            });
        } else {
            //Cập nhật thông tin Campaign
            const { name, agent, goal, image, type, endAt, desc } = req.body;
            const img = req.file;
            const imgPath = img ? img.path.substr(6) : image;
            const filter = { _id: id };
            const update = {
                name: name,
                agent: agent,
                goal: goal,
                image: imgPath,
                type: type,
                desc: desc,
                endAt: endAt,
            };
            Campaign.findOneAndUpdate(filter, update).then(() => {
                req.flash("success", "Chỉnh sửa Campaign thành công");
                res.redirect("/admin/campaign");
            });
        }
    }
};

//Gửi yêu cầu xóa Campaigns
exports.getCampaignDelete = (req, res, next) => {
    const id = req.params.id || "";
    if (id === "") {
        res.redirect("/admin/campaign");
    } else {
        Campaign.findById(id).then((campaign) => {
            if (campaign.donator != "") {
                req.flash("success", "Không thể xóa Campaign đã nhận từ thiện");
                res.redirect("/admin/campaign");
            } else {
                campaign.delete().then(() => {
                    req.flash("success", "Xóa Campaign thành công");
                    res.redirect("/admin/campaign");
                });
            }
        });
    }
};
