const path = require('path')
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const moment = require("moment");
const MongoDBStore = require("connect-mongodb-session")(session);
const authRoute = require("./routes/auth");
const campaignRoute = require("./routes/campaign");
const paymentRoute = require("./routes/payment");
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
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser());

app.use(
    session({
        secret: "1jf7s03jf792k94ks234",
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 1000*60*60},
        store: store,
    })
);


app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoute);
app.use(campaignRoute);
app.use(paymentRoute);
app.use(uiRoute);

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
