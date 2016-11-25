var secrets = require('../config/secrets');
var Request = require('../models/request');

module.exports = function(router) {

  var requestRoute = router.route('/requests');
  
  requestRoute.get(function(req, res) {
    res.json({ "name": "requesttest", "description": "descriptiontest" });
  });

  requestRoute.post(function(req, res){

  });

  return router;
}