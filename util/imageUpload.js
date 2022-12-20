const multer = require('multer');

const userStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image/user');
    }, 
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
})

const campaignStore = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image/campaign');
    }, 
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
})

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

exports.userUpload =  multer({ storage: userStore, fileFilter: fileFilter }).single('image');
exports.campaignUpload = multer({ storage: campaignStore, fileFilter: fileFilter }).single('image');
