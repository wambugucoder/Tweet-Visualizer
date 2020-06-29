const express = require('express');
const keys=require("./config/keys");
const bodyParser = require('body-parser');
const cookieSession = require("cookie-session");
const app = express();


const  mongoose  = require('mongoose');
const passport = require("passport");
//BODY-PARSER MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));





//MODEL CONFIG

require("./model/User.js");

//DATABASE MIDDLEWARE
mongoose.connect(

keys.mongoURI
, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then((res) => {
  console.log("MongoDb Successfully Connected")
}).catch((err) => {
  console.log(err)
});
//SESSION MANAGEMENT MIDDLEWARE
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookie]
  })
);
//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());
//PASSPORT CONFIG

require("./config/passport");

//ROUTES CONIFG
require("./controller/Api")(app);

//
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
 }

//PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));