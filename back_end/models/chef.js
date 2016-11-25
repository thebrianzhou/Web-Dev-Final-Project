// Load required packages
var mongoose = require('mongoose');

// Define our chef schema
var ChefSchema   = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  profile_pic: {type: String, required: true},
  cuisines: {type: [String], required: true},
  description: String,
  carousel: [String],
  location: {type: [Number], required: true},
  reviews: [{assignedUser: String, rating: Number, review: String}]
});

// Export the Mongoose model
module.exports = mongoose.model('Chef', ChefSchema);