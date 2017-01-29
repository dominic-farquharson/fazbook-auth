/*
local strategy:
  1. user wil log in w/ username + password.
Other strategies include oauth:
  - user logs in w/ other accounts. ex: FB.
*/

// importing passport middleware
const passport = require('passport');

// taking possport strategy, user-name + password
const LocalStrategy = require('passport-local').Strategy;

// importing passport.js file from current directory
const init = require('./passport');

// importing index from db directory
const models = require('../db/models/index');

// importing auth-helpers.js from current directory
const authHelpers = require('../auth/auth-helpers');

// setting a variable options to an empty object
const options = {};

// invoking passport.js file
init();

/*
 using local strategy, username + password
 checking if user info matches that of the database info
*/
passport.use(new LocalStrategy(options, (username, password, done) => {
  // check to see if the username exists
  models.User.findAll({
    where: {
      username
    }
  })
  .then((user) => {
    if (user[0] === undefined) {
      return done(null, false);
    }
    if (!authHelpers.comparePass(password, user[0].dataValues.password)) {
      return done(null, false);
    } else {
      return done(null, user[0].dataValues);
    }
  })
  .catch((err) => { return done(err); });
}));

// exporting module
module.exports = passport;
