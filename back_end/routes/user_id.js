var secrets = require('../config/secrets');
var User = require('../models/user');
var mongoose = require('mongoose');

module.exports = function(router) {

  var useridRoute = router.route('/users/:id');
  
  useridRoute.get(function(req, res) {
    var id = req.params.id;
  	console.log(id);
  	if(!mongoose.Types.ObjectId.isValid(id))
  	{
  		res.status(404).json({"message" : "not a valid mongoose id", "data" : ""});
  		return;
  	}
  	User.findById(id, function(err, user){
  	 	console.log(user);
  	 	if(user)
  	 		res.json({"message" : "got user", "data": user});
  	 	else
  	 		res.status(404).json({"message" : "user not in database", "data": user});
  	});
  });

  useridRoute.put(function(req, res){
  	var id = req.params.id;
  	console.log(id);
  	if(!mongoose.Types.ObjectId.isValid(id))
  	{
  		res.status(404).json({"message" : "not a valid mongoose id", "data" : ""});
  		return;
  	}

    var options = {};
    options.new = true;
  	User.findByIdAndUpdate(id,{$set:req.body}, options, function(err, user){
        console.log(user);
  	 	if(user)
  	 		res.json({"message" : "updated user information", "data": user});
  	 	else
  	 		res.status(404).json({"message" : "user was not in database", "data": user});
    });

  });

  useridRoute.delete(function(req, res){
	var id = req.params.id;
  	console.log(id);
  	if(!mongoose.Types.ObjectId.isValid(id))
  	{
  		res.status(404).json({"message" : "not a valid mongoose id", "data" : ""});
  		return;
  	}
  	User.findByIdAndRemove(id, function(err, user){
  	 	console.log(user);
  	 	if(user)
  	 		res.json({"message" : "deleted user", "data": user});
  	 	else
  	 		res.status(404).json({"message" : "user was not in database", "data": user});
  	});
  });

  return router;
}