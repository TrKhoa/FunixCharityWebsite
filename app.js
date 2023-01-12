const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const moment = require("moment");
const MongoDBStore = require("connect-mongodb-session")(session);
const userRoute = require("./routes/api/user");
const campaignRoute = require("./routes/api/campaign");
const paymentRoute = require("./routes/api/payment");
const uiRoute = require("./routes/ui");
require("dotenv").config();

const app = express();
app.locals.moment = moment;
const PORT = process.env.port || 5000;

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions",
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
    cors({
        origin: ["http://localhost:3000","https://charity-server-side.onrender.com","https://client-side-beryl.vercel.app","https://client-side-5rpo6jgec-trkhoa.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());
app.set('trust proxy',1)

app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000*60*60},
        store: store,
    })
);
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())


app.use(express.static(path.join(__dirname, 'public')));

app.use(userRoute);
app.use(campaignRoute);
app.use(paymentRoute);
app.use(uiRoute);

app.get("/", (req, res) => {
    res.redirect("/admin/dashboard");
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
