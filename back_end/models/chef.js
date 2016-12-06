// Load required packages
var mongoose = require( 'mongoose' );
var crypto = require('crypto');
var jwt = require('jsonwebtoken');


// Define our chef schema
var ChefSchema   = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  profile_pic: {type: String, required: true},
  cuisines: {type: [String], required: true},
  description: String,
  carousel: [String],
  location: {type: [Number], required: true},
  reviews: [{assignedUser: String, rating: Number, review: String}],
  hash: String,
  salt: String
});

ChefSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

ChefSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

ChefSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};


// Export the Mongoose model
module.exports = mongoose.model('Chef', ChefSchema);