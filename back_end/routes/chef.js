var secrets = require('../config/secrets');
var Chef = require('../models/chef');

module.exports = function(router) {

  var chefRoute = router.route('/chefs');
  
  chefRoute.get(function(req, res) {
    var where = {};
      if("where" in req.query)
      	where = eval("("+req.query.where+")");
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
      Chef.find(where, select, options, function(err, results){
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
        res.json({"message" : "results of get", "data": results});
      });
  });

  chefRoute.post(function(req, res){
  	var newChef = new Chef({
  	  	  name: "",
  	  	  email: "",
  	  	  profile_pic: "",
  	  	  cuisines: [],
  	  	  description: "",
  	  	  carousel: [],
  	  	  location: [],
  	  	  reviews: [],
  	  });
  	  
  	  if(("name" in req.body) && ("email" in req.body) && ("profile_pic" in req.body) 
  	  && ("cuisines" in req.body)	&& ("location" in req.body)){
  	  	newChef.name = req.body.name;
	  	newChef.email = req.body.email;
	  	newChef.profile_pic = req.body.profile_pic;
	  	newChef.cuisines = req.body.cuisines;
	  	newChef.location = req.body.location;
	  	if("description" in req.body)
	  	  	newChef.description = req.body.description;
	  	if("carousel" in req.body)
	  		newChef.carousel = req.body.carousel;
	  	if("reviews" in req.body)
	  		newChef.reviews = req.body.reviews;

	  	newChef.save(function (err, result) {
			if (err) 
			    res.status(500).json({"message" : "chef could not be added", "data": err});
			else
		  	  	res.status(201).json({"message" : "chef added to database", "data": result});
  	  	});
  	  	
  	  }
  	  else
  	  {
  	  	//print out some error here to indicate email not provided
  	  	res.status(500).json({"message" : "name, email, profile_pic, cuisines or location not provided", "data" : ""});
  	  }
  });

  chefRoute.options(function(req, res){
      res.writeHead(200);
      res.end();
  });


  return router;
}
