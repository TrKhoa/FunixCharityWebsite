const express = require("express");
const { userUpload, campaignUpload } = require("../util/imageUpload");
const UIController = require("../controller/ui");
const { body } = require("express-validator");
/*
const isAuth = require('../middleware/is-auth');
const isManager = require('../middleware/is-manager');
*/
const router = express.Router();

//Xac thuc
const nameValidate = body("name")
    .notEmpty()
    .withMessage("Tên không đươc rỗng")
    .isLength({ min: 4 })
    .withMessage("Tối thiểu 4 kí tự");
const imageValidate = body("image").notEmpty().withMessage("Phải upload ảnh");

//Users
const usernameValidate = body("username")
    .notEmpty()
    .withMessage("Username không đươc rỗng")
    .isLength({ min: 4 })
    .withMessage("Tối thiểu 4 kí tự");
const passwordValidate = body("password")
    .notEmpty()
    .withMessage("Mật khẩu không đươc rỗng")
    .isLength({ min: 6 })
    .withMessage("Tối thiểu 6 kí tự");
const passwordConfirmValidate = body("passwordConfirm").custom(
    (value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Mật khẩu không giống nhau");
        }
        return true;
    }
);

//Campaigns
const endDateValidate = body("endAt")
    .notEmpty()
    .withMessage("Thiếu ngày kết thúc")
    .custom((value, { req }) => {
        if (value < req.body.startAt) {
            throw new Error("Ngày kết thúc không thể sớm hơn ngày bắt đầu");
        }
        return true;
    });
const goalValidate = body("goal")
    .notEmpty()
    .withMessage("Số tiền không đươc rỗng")
    .isNumeric()
    .withMessage("Dữ liệu phải là số")
    .custom((value, { req }) => {
        if (value < 100000) {
            throw new Error("Mục tiêu tối thiểu là 100.000 VND");
        }
        return true;
    });
const descValidate = body("desc")
    .notEmpty()
    .withMessage("Phần mô tả không đươc rỗng");

//Khai báo dường dẫn
//Dashboard
router.get("/admin/dashboard", UIController.getDashboard);

//Users
router.get("/admin/user", UIController.getUser);
router.get("/admin/user-add", UIController.getUserAdd);
router.post(
    "/admin/user-add",
    [nameValidate, usernameValidate, passwordValidate, passwordConfirmValidate],
    UIController.postUserAdd
);
router.get("/admin/user-edit/:user", UIController.getUserEdit);
router.post("/admin/user-edit/:user", [nameValidate, usernameValidate, passwordValidate, passwordConfirmValidate], UIController.postUserEdit);
router.get("/admin/user-delete/:user", UIController.getUserDelete);

//Campaigns
router.get("/admin/campaign", UIController.getCampaigns);
router.get("/admin/campaign-add", UIController.getCampaignAdd);
router.post(
    "/admin/campaign-add",
    campaignUpload,
    [nameValidate, goalValidate, endDateValidate, descValidate],
    
    UIController.postCampaignAdd
);
router.get("/admin/campaign-edit/:id", UIController.getCampaignEdit);
router.post("/admin/campaign-edit/:id", campaignUpload,
[nameValidate, goalValidate, endDateValidate, descValidate], UIController.postCampaignEdit);
router.get("/admin/campaign-delete/:id", UIController.getCampaignDelete);

module.exports = router;
