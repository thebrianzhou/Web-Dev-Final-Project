var secrets = require('../config/secrets');
var Request = require('../models/request');

module.exports = function(router) {

  var requestRoute = router.route('/requests');
  
  requestRoute.get(function(req, res) {
  	var where = {};
      if("where" in req.query)
      	where = eval("("+req.query.where+")");
      console.log(where);
      var select = {};
      if("select" in req.query)
      	select = eval("("+req.query.select+")");
      var options = {};
      if("sort" in req.query)
      	options.sort = eval("("+req.query.sort+")");
      if("skip" in req.query)
      	options.skip = eval("("+parseInt(req.query.skip)+")");;
      if("limit" in req.query)
      	options.limit = eval("("+parseInt(req.query.limit)+")");
      console.log(options);
      Request.find(where, select, options, function(err, results){
      	if(err)
      	{
      		res.status(500).json({"message" : "error: we don't know what happened", "data" : ""});
      		return;
      	}
      	if("count" in req.query)
      		var count = req.query.count;
      	if(count=="true")
      	{
    		res.json({"message" : "amount of results", "data": results.length});
    		return;
      	}
      	console.log(results);
        res.json({"message" : "results of get", "data": results});
      });
  });

  requestRoute.post(function(req, res){
  	var newRequest = new Request({
  	  	  assignedUser : "",
  	  	  assignedChef: "",
  	  	  budget: 0,
  	  	  payment: 0,
  	  	  cuisine: "",
  	  	  description: ""
  	  });
  	  
  	  if(("assignedUser" in req.body) && ("assignedChef" in req.body) && ("budget" in req.body)
  	  	 && ("payment" in req.body) && ("cuisine" in req.body)){
  	  	newRequest.assignedUser= req.body.assignedUser;
	  	newRequest.assignedChef = req.body.assignedChef;
	  	newRequest.budget = req.body.budget;
	  	newRequest.payment = req.body.payment;
	  	newRequest.cuisine = req.body.cuisine;
	  	if("description" in req.body)
	  	  	newRequest.description = req.body.description;

	  	newRequest.save(function (err, result) {
			if (err) 
			    res.status(500).json({"message" : "request could not be added", "data": err});
			else
		  	  	res.status(201).json({"message" : "request added to database", "data": result});
  	  	});
  	  	
  	  }
  	  else
  	  {
  	  	//print out some error here to indicate email not provided
  	  	res.status(500).json({"message" : "assignedUser, assignedChef, budget, payment, or cuisine not provided", "data" : ""});
  	  }
  });

  requestRoute.options(function(req, res){
      res.writeHead(200);
      res.end();
  });

  return router;
}