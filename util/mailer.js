const nodeMailer = require('nodemailer');
const { sendMail } = require('../config/mail.config')

exports.sendMail = (to, subject, htmlContent) => {
    const transport = nodeMailer.createTransport({
        host: mailConfig.HOST,
        port: mailConfig.PORT,
        secure: false,
        auth: {
            user: mailConfig.USERNAME,
            pass: mailConfig.PASSWORD,
        }
    })

    const options = {
        from: mailConfig.FROM_ADDRESS,
        to: to,
        subject: subject,
        htmlContent: htmlContent
    }

    return transport.sendMail(options);
}