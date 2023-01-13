const nodeMailer = require('nodemailer');
const mailConfig = require('../config/mail.config');
const { sendMail } = require('../config/mail.config')

//Tạo yêu cầu gửi mail
exports.sendMail = async (to, subject, htmlContent) => {
    //Lấy thông tin từ file config để thiết lập
    const transport = nodeMailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD,
        }
    })

    //Thiệt lập nội dung Mail
    const options = {
        from: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        html: htmlContent,
    }
    
    return transport.sendMail(options);
}
