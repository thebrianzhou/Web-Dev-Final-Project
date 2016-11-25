var secrets = require('../config/secrets');
var Chef = require('../models/chef');

module.exports = function(router) {

  var chefRoute = router.route('/chefs');
  
  chefRoute.get(function(req, res) {
    res.json({ "name": "cheftest", "description": "descriptiontest" });
  });

  chefRoute.post(function(req, res){

  });

  return router;
}
