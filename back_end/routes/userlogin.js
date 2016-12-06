var secrets = require('../config/secrets');
var User = require('../models/user');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
var ctrlAuth = require('./auth');

module.exports = function(router) {

  var userLoginRoute = router.route('/userlogin');
  userLoginRoute.post(ctrlAuth.userlogin);
  return router;
}