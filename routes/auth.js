const express = require('express');
const router = express.Router();
const authController = require('../controller/auth')
/*
const isAuth = require('../middleware/is-auth');
const isManager = require('../middleware/is-manager');
*/

//Khai báo dường dẫn
router.get("/isLogin", authController.isLogin);
router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);
router.get("/logout", authController.isLogout);
router.post("/passwordReset/:user", authController.postPasswordReset);
router.get("/forgotPassword", authController.getForgotPassword);
router.post("/forgotPassword/", authController.postForgotPassword);

module.exports = router;
