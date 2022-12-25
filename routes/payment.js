const express = require("express");
const sha256 = require("sha256");
const querystring = require("qs");
const moment = require("moment");
const dateFormat = require("dateformat");
const paymentController = require("../controller/payment");
const vnpayConfig = require("../config/vnpay.config");

const router = express.Router();

router.post("/create_payment_url", paymentController.postCreatePayment);

router.get('/vnpay_ipn', function (req, res, next) {
    var vnp_Params = req.query;
    var secureHash = vnp_Params['vnp_SecureHash'];

    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];

    vnp_Params = sortObject(vnp_Params);
    var config = require('config');
    var secretKey = config.get('vnp_HashSecret');
    var querystring = require('qs');
    var signData = secretKey + querystring.stringify(vnp_Params, { encode: false });
    
    var sha256 = require('sha256');

    var checkSum = sha256(signData);

    if(secureHash === checkSum){
        var orderId = vnp_Params['vnp_TxnRef'];
        var rspCode = vnp_Params['vnp_ResponseCode'];
        //Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi
        res.status(200).json({RspCode: '00', Message: 'success'})
    }
    else {
        res.status(200).json({RspCode: '97', Message: 'Fail checksum'})
    }
});

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
