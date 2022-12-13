const express = require('express');
// const { body } = require('express-validator/check');
const router = express.Router();
const authController = require('../controller/auth')
/*
const isAuth = require('../middleware/is-auth');
const isManager = require('../middleware/is-manager');
*/

//Khai báo dường dẫn
router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);

module.exports = router;
