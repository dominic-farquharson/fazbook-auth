/*
importing express
*/
const express = require('express');
/*
invoking router method and setting to a variable
*/
const router = express.Router();

/*
importing authHelpers and passport
*/
const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

// getting register rout, rendering register from auth directory
router.get('/register', authHelpers.loginRedirect, (req, res)=> {
  res.render('auth/register');
});

/*
when new user is created, browser sends data in form to
the express server. Route middleware then creats a new
user using that data.

*/

router.post('/register', (req, res, next)  => {
  return authHelpers.createUser(req, res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});

/*
log in page route. If user is logged in they go to their
profile page. else, they go to log in page
*/
router.get('/login', authHelpers.loginRedirect, (req, res)=> {
  res.render('auth/login');
});

/*
authenticates user
*/
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

/*
log out route. Kills the user session then routes to the
route directory.
*/
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
