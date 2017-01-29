/*
Helper functions. Bcrypt will encrypt passwords
*/
// importing bcrypt
const bcrypt = require('bcryptjs');

// importing index from db directory
const models = require('../db/models/index');

/*
function to compare inputted password with
database password
*/
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

/*
If user is logged in they are redirected to their profile page
*/
function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    { status: 'You are already logged in' }
  );

  return next();
}

/*
password is encrypted. User is then inserted into table.
*/
function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  }).then(() => {
    res.redirect('/');
  });
}
/*
Helper method, login required if user requests a page
when they aren't logged in.

*/
function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });

  return next();
}
/*
Exporting modules for use in other files

*/
module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser
}
