var secrets = require('../config/secrets');
var Chef = require('../models/chef');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
var ctrlAuth = require('./auth');

module.exports = function(router) {

  var chefLoginRoute = router.route('/cheflogin');
  chefLoginRoute.post(ctrlAuth.cheflogin);
  return router;
}