var secrets = require('../config/secrets');
var Llama = require('../models/llama');

module.exports = function(router) {

  var llamaRoute = router.route('/llamas');
  
  llamaRoute.get(function(req, res) {
    res.json([{ "name": "alice", "height": 12 }, { "name": "jane", "height": 13 }]);
  });

  return router;
}


