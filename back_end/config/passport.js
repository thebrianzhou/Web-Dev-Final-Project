var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require('../models/user');
var Chef = require('../models/chef');

passport.use('User', new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found in database
      if (!user) {
        return done(null, false, {
          message: 'User not found'
        });
      }
      // Return if password is wrong
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));	

passport.use('Chef', new LocalStrategy({
    usernameField: 'email'
  },
  function(chefname, password, done) {
    Chef.findOne({ email: chefname }, function (err, chef) {
      if (err) { return done(err); }
      // Return if chef not found in database
      if (!chef) {
        return done(null, false, {
          message: 'Chef not found'
        });
      }
      // Return if password is wrong
      if (!chef.validPassword(password)) {
        return done(null, false, {
          message: 'Password is wrong'
        });
      }
      // If credentials are correct, return the chef object
      return done(null, chef);
    });
  }
));
