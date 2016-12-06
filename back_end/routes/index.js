/*
 * Connect all of your endpoints together here.
 */

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});
var ctrlAuth = require('./auth');

//var ctrlProfile = require('../controllers/profile');

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
  app.use('/api', require('./userlogin.js')(router));
  app.use('/api', require('./cheflogin.js')(router));

};