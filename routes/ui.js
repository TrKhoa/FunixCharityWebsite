const express = require("express");
const { userUpload, campaignUpload } = require("../util/imageUpload");
const { isAuth } = require("../middleware/isAuth");
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
router.get("/admin/dashboard", isAuth, UIController.getDashboard);
router.get("/admin/logout", isAuth, UIController.getLogout);
//Users
router.get("/admin/user", isAuth, UIController.getUser);
router.get("/admin/user-add", isAuth, UIController.getUserAdd);
router.post(
    "/admin/user-add",
    [nameValidate, usernameValidate, passwordValidate, passwordConfirmValidate],
    UIController.postUserAdd
);
router.get("/admin/user-edit/:user", isAuth, UIController.getUserEdit);
router.post(
    "/admin/user-edit/:user",
    [nameValidate, usernameValidate],
    UIController.postUserEdit
);
router.get("/admin/user-delete/:user", isAuth, UIController.getUserDelete);
router.post("/admin/user-delete", isAuth, UIController.postMultiUserDelete);
router.get("/admin/user-passwordGen/:user", isAuth, UIController.getUserPasswordGen);
//Campaigns
router.get("/admin/campaign", isAuth, UIController.getCampaigns);
router.get("/admin/campaign-add", isAuth, UIController.getCampaignAdd);
router.post(
    "/admin/campaign-add",
    campaignUpload,
    [nameValidate, goalValidate, endDateValidate, descValidate],

    UIController.postCampaignAdd
);
router.get("/admin/campaign-edit/:id", isAuth, UIController.getCampaignEdit);
router.post(
    "/admin/campaign-edit/:id",
    campaignUpload,
    [nameValidate, goalValidate, endDateValidate, descValidate],
    UIController.postCampaignEdit
);
router.get("/admin/campaign-delete/:id", isAuth, UIController.getCampaignDelete);

module.exports = router;
