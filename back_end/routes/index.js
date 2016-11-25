/*
 * Connect all of your endpoints together here.
 */
module.exports = function (app, router) {
  app.use('/api', require('./home.js')(router));
  app.use('/api', require('./chef.js')(router));
  app.use('/api', require('./user.js')(router));
  app.use('/api', require('./request.js')(router));
  app.use('/api', require('./chef_id.js')(router));
  app.use('/api', require('./user_id.js')(router));
  app.use('/api', require('./request_id.js')(router));
};