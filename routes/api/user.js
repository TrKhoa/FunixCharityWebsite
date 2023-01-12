const express = require('express');
const router = express.Router();
const userController = require('../../controller/api/user')
/*
const isAuth = require('../middleware/is-auth');
const isManager = require('../middleware/is-manager');
*/

//Khai báo dường dẫn
router.get("/isLogin", userController.isLogin);
router.post("/register", userController.postRegister);
router.post("/login", userController.postLogin);
router.get("/logout", userController.isLogout);
router.post("/passwordReset/:user", userController.postPasswordReset);
router.get("/forgotPassword", userController.getForgotPassword);
router.post("/forgotPassword/", userController.postForgotPassword);
router.post("/changePassword/", userController.postChangePassword);

module.exports = router;
