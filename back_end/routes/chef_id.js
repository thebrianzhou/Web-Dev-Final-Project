var secrets = require('../config/secrets');
var Chef = require('../models/chef');
var mongoose = require('mongoose');

module.exports = function(router) {

  var chefidRoute = router.route('/chefs/:id');
  
  chefidRoute.get(function(req, res) {
    res.json({ "name": "chefidtest", "description": "descriptiontest" });
  });

  return router;
}