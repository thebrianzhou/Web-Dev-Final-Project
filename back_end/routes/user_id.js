var secrets = require('../config/secrets');
var User = require('../models/user');
var mongoose = require('mongoose');

module.exports = function(router) {

  var useridRoute = router.route('/users/:id');
  
  useridRoute.get(function(req, res) {
    res.json({ "name": "useridtest", "description": "descriptiontest" });
  });

  return router;
}