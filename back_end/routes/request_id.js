var secrets = require('../config/secrets');
var Request = require('../models/request');
var mongoose = require('mongoose');

module.exports = function(router) {

  var requestidRoute = router.route('/requests/:id');
  
  requestidRoute.get(function(req, res) {
    res.json({ "name": "requestidtest", "description": "descriptiontest" });
  });

  return router;
}