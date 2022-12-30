const express = require("express");
const sha256 = require("sha256");
const querystring = require("qs");
const moment = require("moment");
const dateFormat = require("dateformat");
const paymentController = require("../../controller/api/payment");
const vnpayConfig = require("../../config/vnpay.config");

const router = express.Router();

router.post("/create_payment_url", paymentController.postCreatePayment);

router.get('/vnpay_ipn', paymentController.vnpayIpn);

router.get("/payment_return", paymentController.getPaymentReturn);

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            "+"
        );
    }
    return sorted;
}
module.exports = router;
