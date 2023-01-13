const multer = require('multer');

//Thiết lập vị trí lưu hình ảnh
//User
const userStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image/user');
    }, 
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
})

//Campaign
const campaignStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image/campaign');
    }, 
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
})

//Thiết lập bộ lọc hình ảnh
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

//Tạo yêu cầu upload hình ảnh
exports.userUpload =  multer({ storage: userStore, fileFilter: fileFilter }).single('image');
exports.campaignUpload = multer({ storage: campaignStore, fileFilter: fileFilter }).single('image');
