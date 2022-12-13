const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const multer = require("multer");
const moment = require("moment");
const MongoDBStore = require("connect-mongodb-session")(session);
const authRoute = require("./routes/auth");
const campaignRoute = require("./routes/campaign");
const paymentRoute = require("./routes/payment");
require("dotenv").config();

const app = express();
app.locals.moment = moment;
const PORT = process.env.port || 5000;

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions",
});

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + "-" + file.originalname);
    },
});

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(
    session({
        secret: "my secret",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);

app.use(authRoute);
app.use(campaignRoute);
app.use(paymentRoute);

app.get("/", (req, res) => {
    res.send(
        '<html><form action="/create_payment_url" method="POST"><button type="submit">Test</button></form></html>'
    );
});

/*
app.get('/', (req,res)=>{
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ message: "Hello World"}));  
  res.end();  
})
*/

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        app.listen(PORT, "0.0.0.0", () => {
            console.log("Server is running.");
        });
    })
    .catch((err) => {
        console.log(err);
    });
