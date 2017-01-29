/*
Includes functions to serialize and deserialize
the user.

-serialization: user info(JSON) is taken and turned
into a format that computer can store in memory.

-deserialization: user data is taken out of session
memory and converted(JSON) so app can manipulate
that data.
*/

// importing passport middleware
const passport = require('passport');

// importing index from db directory
const models = require('../db/models/index');

// import for use in other parts of app
module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findById(id)
    .then((user) => { done(null, user); })
    .catch((err) => { done(err, null); });
  });
};
