const { body } = require("express-validator");
//Xac thuc
exports.nameValidate = body("name")
    .notEmpty()
    .withMessage("Tên không đươc rỗng")
    .isLength({ min: 4 })
    .withMessage("Tối thiểu 4 kí tự");
exports.imageValidate = body("image").notEmpty().withMessage("Phải upload ảnh");
exports.phoneValidate = body("phone")
    .notEmpty()
    .withMessage("Số điện thoại không đươc rỗng")
    .isLength({ min: 10 })
    .withMessage("Tối thiểu 10 số");
//Users
exports.usernameValidate = body("username")
    .notEmpty()
    .withMessage("Username không đươc rỗng")
    .isLength({ min: 4 })
    .withMessage("Tối thiểu 4 kí tự");
exports.passwordValidate = body("password")
    .notEmpty()
    .withMessage("Mật khẩu không đươc rỗng")
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
    .withMessage("Số tiền không đươc rỗng")
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
    .withMessage("Phần mô tả không đươc rỗng");