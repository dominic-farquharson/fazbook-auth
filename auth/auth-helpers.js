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
