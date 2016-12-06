// Get the packages we need
// Authentication code inspired by https://www.sitepoint.com/user-authentication-mean-stack/
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

var bodyParser = require('body-parser');
var passport = require('passport');

var secrets = require('./config/secrets');

var mongoose = require('mongoose');

mongoose.connect(secrets.mongo_connection);

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = 8000;

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {	
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser());

app.use(passport.initialize());

// Use routes as a module (see index.js)
require('./routes')(app, router);
require('./config/passport');


// Start the server
app.listen(port);
console.log('Server running on port ' + port);
