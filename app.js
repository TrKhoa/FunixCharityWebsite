const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
require('dotenv').config();

const app = express();
const PORT = process.env.port || 5000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json())
app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true
    })
  );

const charityRoute = require('./routes/charity');

app.use(charityRoute);

app.get('/', (req,res)=>{
    res.send('<html><form action="/create_payment_url" method="POST"><button type="submit">Test</button></form></html>');
})

/*
app.get('/', (req,res)=>{
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify({ message: "Hello World"}));  
  res.end();  
})
*/

mongoose
    .connect(
        process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    ).then(result =>{
      app.listen(PORT, '0.0.0.0', () => {
        console.log("Server is running.");
      });
    })
    .catch(err=>{
      console.log(err);
    })