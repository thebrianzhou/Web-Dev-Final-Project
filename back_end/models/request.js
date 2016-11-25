// Load required packages
var mongoose = require('mongoose');

// Define our request schema
var RequestSchema   = new mongoose.Schema({
  assignedUser: {type: String, required: true},
  assignedChef: {type: String, required: true},
  budget: {type: Number, required: true},
  payment: {type: Number, required: true},
  cuisine: {type: String, required: true},
  description: String
});

// Export the Mongoose model
module.exports = mongoose.model('Request', RequestSchema);