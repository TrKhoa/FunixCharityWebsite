require("dotenv/config")

module.exports ={
    MAILER: process.env.MAILER,
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    ENCRYPTION: process.env.ENCRYPTION,
    FROM_ADDRESS: process.env.FROM_ADDRESS,
    FROM_NAME: process.env.FROM_NAME
}