const { body } = require("express-validator");
//Xác thực nhập Form
exports.nameValidate = body("name")
    .notEmpty()
    .withMessage("Tên không được rỗng")
    .isLength({ min: 4 })
    .withMessage("Tối thiểu 4 kí tự");
exports.imageValidate = body("image").notEmpty().withMessage("Phải upload ảnh");
exports.phoneValidate = body("phone")
    .notEmpty()
    .withMessage("Số điện thoại không được rỗng")
    .isLength({ min: 10 })
    .withMessage("Tối thiểu 10 số");
//Users
exports.usernameValidate = body("username")
    .notEmpty()
    .withMessage("Tài khoản không được rỗng")
    .isLength({ min: 4 })
    .withMessage("Tối thiểu 4 kí tự");
exports.passwordValidate = body("password")
    .notEmpty()
    .withMessage("Mật khẩu không được rỗng")
    .isLength({ min: 6 })
    .withMessage("Tối thiểu 6 kí tự");
exports.passwordConfirmValidate = body("passwordConfirm").custom(
    (value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Mật khẩu không giống nhau");
        }
        return true;
    }
);

//Campaigns
exports.endDateValidate = body("endAt")
    .notEmpty()
    .withMessage("Thiếu ngày kết thúc")
    .custom((value, { req }) => {
        if (value < req.body.startAt) {
            throw new Error("Ngày kết thúc không thể sớm hơn ngày bắt đầu");
        }
        return true;
    });
exports.goalValidate = body("goal")
    .notEmpty()
    .withMessage("Số tiền không được rỗng")
    .isNumeric()
    .withMessage("Dữ liệu phải là số")
    .custom((value, { req }) => {
        if (value < 100000) {
            throw new Error("Mục tiêu tối thiểu là 100.000 VND");
        }
        return true;
    });
exports.descValidate = body("desc")
    .notEmpty()
    .withMessage("Phần mô tả không được rỗng");