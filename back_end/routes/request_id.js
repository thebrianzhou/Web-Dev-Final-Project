var secrets = require('../config/secrets');
var Request = require('../models/request');
var mongoose = require('mongoose');

module.exports = function(router) {

  var requestidRoute = router.route('/requests/:id');
  
  requestidRoute.get(function(req, res) {
    var id = req.params.id;
  	console.log(id);
  	if(!mongoose.Types.ObjectId.isValid(id))
  	{
  		res.status(404).json({"message" : "not a valid mongoose id", "data" : ""});
  		return;
  	}
  	Request.findById(id, function(err, request){
  	 	console.log(request);
  	 	if(request)
  	 		res.json({"message" : "got request", "data": request});
  	 	else
  	 		res.status(404).json({"message" : "request not in database", "data": request});
  	});
  });

  requestidRoute.put(function(req, res){
  	var id = req.params.id;
  	console.log(id);
  	if(!mongoose.Types.ObjectId.isValid(id))
  	{
  		res.status(404).json({"message" : "not a valid mongoose id", "data" : ""});
  		return;
  	}

    var options = {};
    options.new = true;
  	Request.findByIdAndUpdate(id,{$set:req.body}, options, function(err, request){
        console.log(request);
  	 	if(request)
  	 		res.json({"message" : "updated request information", "data": request});
  	 	else
  	 		res.status(404).json({"message" : "request was not in database", "data": request});
    });

  });

  requestidRoute.delete(function(req, res){
	var id = req.params.id;
  	console.log(id);
  	if(!mongoose.Types.ObjectId.isValid(id))
  	{
  		res.status(404).json({"message" : "not a valid mongoose id", "data" : ""});
  		return;
  	}
  	Request.findByIdAndRemove(id, function(err, request){
  	 	console.log(request);
  	 	if(request)
  	 		res.json({"message" : "deleted request", "data": request});
  	 	else
  	 		res.status(404).json({"message" : "request was not in database", "data": request});
  	});
  });

  return router;
}