const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/user")

router.get('/delete', async (req, res) => {
    await User.deleteMany({});
    res.redirect('/');
});


router.get('/login', (req, res) => {
    res.render('login.ejs', { error: '' });
});


router.post('/login', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {

        if(!foundUser) {
            return res.render('login.ejs', {error: 'Invalid Credentials'});
        }

        const isMatched = bcrypt.compareSync(req.body.password, foundUser.password);

        if(!isMatched) {
            return res.render('login.ejs', {error: 'Invalid Credentials'});
        }

        req.session.user = foundUser._id;

        res.redirect('/session')
    });
});


router.get('/signup', (req, res) => {
    res.render('signup.ejs');
});

router.post('/signup', (req, res) => {
   // 0) Perform a db lookup to determine if username exist 
  // 1) Hash the password
   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  // 2) Save the user data to the database with the hashed version of the password
  User.create(req.body, (err, user) => {
      // 4) login with a session and then send the user a dashboard
      req.session.user = user._id
      res.redirect('/session');
  });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/users/login');
    });
});

// Protected Route
router.get('/session', isAuthenticated, (req, res) => {
    User.findById(req.session.user, (err, user) => {
        res.render('session.ejs', { user });
    });
});

// Utility Functions

// Auth middleware
function isAuthenticated(req, res, next) {
    if(!req.session.user) { // user is not logged in
        return res.redirect('/users/login');
    } 
    next(); // user is authenticated, keep moving on to the next step
}





module.exports = router;