const express = require("express");
const { userUpload, campaignUpload } = require("../util/imageUpload");
const UIController = require("../controller/ui");
const mailer = require("../util/mailer");
const {
    nameValidate,
    usernameValidate,
    passwordValidate,
    passwordConfirmValidate,
    endDateValidate,
    goalValidate,
    descValidate,
} = require("../middleware/validate");
/*
const isAuth = require('../middleware/is-auth');
const isManager = require('../middleware/is-manager');
*/
const router = express.Router();

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
router.post(
    "/admin/user-edit/:user",
    [nameValidate, usernameValidate],
    UIController.postUserEdit
);
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
router.post(
    "/admin/campaign-edit/:id",
    campaignUpload,
    [nameValidate, goalValidate, endDateValidate, descValidate],
    UIController.postCampaignEdit
);
router.get("/admin/campaign-delete/:id", UIController.getCampaignDelete);

module.exports = router;
