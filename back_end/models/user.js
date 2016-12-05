// Load required packages
var mongoose = require('mongoose');

// Define our user schema
var UserSchema   = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  profile_pic: String,
  location: {type: [Number], required: true},
  hashed_password: {type: String, required: true}
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);