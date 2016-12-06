/*
 * Connect all of your endpoints together here.
 */


var express = require('express');
var router = express.Router();


//var ctrlProfile = require('../controllers/profile');
var ctrlAuth = require('./auth');

module.exports = function (app, router) {
  app.use('/api', require('./home.js')(router));
  app.use('/api', require('./chef.js')(router));
  app.use('/api', require('./user.js')(router));
  app.use('/api', require('./request.js')(router));
  app.use('/api', require('./chef_id.js')(router));
  app.use('/api', require('./user_id.js')(router));
  app.use('/api', require('./request_id.js')(router));
// router.get('/api/profile', auth, ctrlProfile.profileRead); //integrate into user/chef get

// authentication
  router.post('/api/userlogin', ctrlAuth.userlogin);
  router.post('/api/cheflogin', ctrlAuth.cheflogin);
};