const express = require("express");
const sha256 = require("sha256");
const querystring = require("qs");
const moment = require("moment");
const ObjectID = require("mongodb").ObjectId;
const dateFormat = require("dateformat");
const vnpayConfig = require("../config/vnpay.config");
const User = require("../model/User");
const Campaign = require("../model/Campaign");

exports.getCreate = async (req, res) => {
    let data = req.body;
    console.log(data);
};

exports.postPostName = async (req, res) => {
    let { name } = req.body;
    console.log(name);
};

exports.postCreatePayment = async (req, res, next) => {
    const { value, campaign } = req.body;
    let ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;

    let tmnCode = vnpayConfig.vnp_TmnCode;
    let secretKey = vnpayConfig.vnp_HashSecret;
    let vnpUrl = vnpayConfig.vnp_Url;
    let returnUrl = vnpayConfig.vnp_ReturnUrl;

    let date = new Date();

    let createDate = dateFormat(date, "yyyymmddHHmmss");
    let orderId = dateFormat(date, "HHmmss");
    let amount = value;
    let bankCode = "";

    let orderInfo = campaign;
    let orderType = "billpayment";
    let locale = "vn";
    let currCode = "VND";
    let vnp_Params = {};
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
    let signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false });
    let secureHash = sha256(signData);

    vnp_Params["vnp_SecureHashType"] = "SHA256";
    vnp_Params["vnp_SecureHash"] = secureHash;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: true });

    res.send(vnpUrl);
};

exports.vnpayIpn = async (req, res) => {
    var vnp_Params = req.query;
    var secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    let secretKey = vnpayConfig.vnp_HashSecret;
    var querystring = require("qs");
    let signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false });
    let checkSum = sha256(signData);

    if (checkSum == checkSum) {
        var orderId = vnp_Params["vnp_TxnRef"];
        var rspCode = vnp_Params["vnp_ResponseCode"];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).send("<html><body>OK</body></html>");
    } else {
        res.status(200).json({
            RspCode: "97",
            Message: checkSum,
            Test: checkSum,
        });
    }
};

exports.getPaymentReturn = async (req, res, next) => {
    let vnp_Params = req.query;
    let campaignId = new ObjectID(vnp_Params.vnp_OrderInfo);
    const userId = req.session.user
        ? new ObjectID(req.session.user._id)
        : false;
    let amount = parseInt(vnp_Params.vnp_Amount) / 100;
    let payDate = vnp_Params.vnp_PayDate;
    let status = vnp_Params.vnp_TransactionStatus;

    const userDonate = userId
        ? User.findById(userId).then((user) => {
              if (user) return user.donate;
              else return [];
          })
        : false;
    const campaignInfo = Campaign.findById(campaignId).then((campaign) => {
        if (campaign) return campaign;
        else return [];
    });

    let secureHash = vnp_Params["vnp_SecureHash"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    let tmnCode = vnpayConfig.vnp_TmnCode;
    let secretKey = vnpayConfig.vnp_HashSecret;

    let signData =
        secretKey + querystring.stringify(vnp_Params, { encode: false });

    let checkSum = sha256(signData);

    if (secureHash === checkSum) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        Promise.all([userDonate, campaignInfo]).then((val) => {
            const user = val[0];
            const campaign = val[1].donator;
            const campaignRaise = parseInt(val[1].raise);
            const userData = {
                campaign: campaignId,
                cash: amount,
                date: payDate,
            };
            const campaignData = {
                user: userId ? userId : null,
                raise: amount,
                date: payDate,
            };
            console.log(campaignRaise + amount);
            if (status == "00") {
                if (userId) {
                    user.push(userData);
                    User.findOneAndUpdate({ _id: userId }, { donate: user });
                }
                campaign.push(campaignData);
                Campaign.findOneAndUpdate(
                    { _id: campaignId },
                    { donator: campaign, raise: campaignRaise + amount }
                ).then((result) =>
                    res.redirect(process.env.CLIENT_URL + "/thankyou")
                );
            } else {
                res.redirect(process.env.CLIENT_URL);
            }
        });
    } else {
        res.redirect(process.env.CLIENT_URL);
    }
};

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
