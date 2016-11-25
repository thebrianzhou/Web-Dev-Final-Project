var secrets = require('../config/secrets');
var User = require('../models/user');

module.exports = function(router) {

  var userRoute = router.route('/users');
  
  userRoute.get(function(req, res) {
    res.json({ "name": "usertest", "description": "descriptiontest" });
  });

  userRoute.post(function(req, res){

  });

  return router;
}