/*
 * Connect all of your endpoints together here.
 */


var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('../controllers/authentication');

module.exports = function (app, router) {
  app.use('/api', require('./home.js')(router));
  app.use('/api', require('./chef.js')(router));
  app.use('/api', require('./user.js')(router));
  app.use('/api', require('./request.js')(router));
  app.use('/api', require('./chef_id.js')(router));
  app.use('/api', require('./user_id.js')(router));
  app.use('/api', require('./request_id.js')(router));
  router.get('/profile', auth, ctrlProfile.profileRead);

// authentication
  router.post('/api/userregister', ctrlAuth.userregister);
  router.post('/api/userlogin', ctrlAuth.userlogin);
  router.post('/api/chefregister', ctrlAuth.chefregister);
  router.post('/api/cheflogin', ctrlAuth.cheflogin);
};