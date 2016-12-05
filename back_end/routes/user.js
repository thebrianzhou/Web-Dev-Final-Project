var secrets = require('../config/secrets');
var User = require('../models/user');

module.exports = function(router) {

  var userRoute = router.route('/users');
  
  userRoute.get(function(req, res) {
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
      User.find(where, select, options, function(err, results){
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

  userRoute.post(function(req, res){
  	var newUser = new User({
  	  	  name: "",
  	  	  email: "",
  	  	  profile_pic: "",
  	  	  location: [],
          hashed_password: ""
  	  });
  	  
  	  if(("name" in req.body) && ("email" in req.body) && ("location" in req.body) && ("hashed_password" in req.body))
  	  {
  	  	newUser.name = req.body.name;
	  	newUser.email = req.body.email;
	  	newUser.location = req.body.location;
      newUser.hashed_password = req.body.hashed_password
	  	if("profile_pic" in req.body)
	  	  	newUser.profile_pic = req.body.profile_pic;

	  	newUser.save(function (err, result) {
			if (err) 
			    res.status(500).json({"message" : "user could not be added", "data": err});
			else
		  	  	res.status(201).json({"message" : "user added to database", "data": result});
  	  	});
  	  	
  	  }
  	  else
  	  {
  	  	//print out some error here to indicate email not provided
  	  	res.status(500).json({"message" : "name, email, or location not provided", "data" : ""});
  	  }
  });

  userRoute.options(function(req, res){
      res.writeHead(200);
      res.end();
  });

  return router;
}