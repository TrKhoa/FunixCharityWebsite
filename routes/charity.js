const express = require("express");
const config = require("config");
const dateFormat = require("dateformat");

const User = require("../model/User");
const Campaign = require("../model/Campaign");

const router = express.Router();

router.post("/register", async (req, res) => {
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
});

router.post("/login", async (req, res) => {
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
});

router.get("/campaigns", async (req, res) => {
    /*
    const testCreate = new Campaign({
        name: "Góp bữa ăn sáng xây dựng kỹ năng “Vào Đời” cho 500 trẻ thanh thiếu niên mồ côi, khó khăn",
        image: "c5",
        desc: "",
        raise: 2700000,
        goal: 200000000,
        donator: [],
        startAt: "",
        endAt: ""
    });
    testCreate.save().then(e=>{
        console.log(e);
    })
    */

    Campaign.find().then((campaign) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(campaign));
        res.end();
    });
});

router.post("/create", async (req, res) => {
    let data = req.body;
    console.log(data);
});

router.post("/post_name", async (req, res) => {
    let { name } = req.body;
    console.log(name);
});

router.post("/create_payment_url", function (req, res, next) {
    var ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    var config = require("config");
    var dateFormat = require("dateformat");

    var tmnCode = config.get("vnp_TmnCode");
    var secretKey = config.get("vnp_HashSecret");
    var vnpUrl = config.get("vnp_Url");
    var returnUrl = config.get("vnp_ReturnUrl");

    var date = new Date();

    var createDate = dateFormat(date, "yyyymmddHHmmss");
    var orderId = dateFormat(date, "HHmmss");
    var amount = 10000000 || req.body.amount;
    var bankCode = "NCB" || req.body.bankCode;

    var orderInfo = "ko" || req.body.orderDescription;
    var orderType = "billpayment" || req.body.orderType;
    var locale = "vn" || req.body.language;
    if (locale === null || locale === "") {
        locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};
    vnp_Params["vnp_Version"] = "2";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params["vnp_Locale"] = locale;
    vnp_Params["vnp_CurrCode"] = currCode;
    vnp_Params["vnp_TxnRef"] = orderId;
    vnp_Params["vnp_OrderInfo"] = orderInfo;
    vnp_Params["vnp_OrderType"] = orderType;
    vnp_Params["vnp_Amount"] = amount * 100;
    vnp_Params["vnp_ReturnUrl"] = returnUrl;

    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    if (bankCode !== null && bankCode !== "") {
        vnp_Params["vnp_BankCode"] = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require("qs");
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var crypto = require("crypto");
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

    res.redirect(vnpUrl);
});

function sortObject(o) {
    var sorted = {},
        key,
        a = [];

    for (key in o) {
        if (o.hasOwnProperty(key)) {
            a.push(key);
        }
    }

    a.sort();

    for (key = 0; key < a.length; key++) {
        sorted[a[key]] = o[a[key]];
    }
    return sorted;
}

module.exports = router;
