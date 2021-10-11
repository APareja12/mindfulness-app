const express = require('express');
const router = express.Router();
const User = require('../models/user')


router.get('/', (req, res) => {
    console.log(req.session.user)
    res.render('portal.ejs'), { user: req.session.user }
});

module.exports = router;