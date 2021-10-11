const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const session = require("express-session")
const app = express();
const indexController = require('./controllers/index');
const meditationController = require('./controllers/meditations');
const usersController = require('./controllers/users');
require('dotenv').config();



const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;


mongoose.connect(DATABASE_URL);
const db = mongoose.connection;


db.on('connected', () => {
    console.log(`Connected to MongoDB`)
});
db.on('error', (error) => {
    console.log(`An Error Occurred with MongoDB ${error.message}`)
});


app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(session({
    secret: 'cknlkclnclnen', // this is used to digitally sign our session cookies (prevents forgery)
    resave: false, 
    saveUninitialized: false 
}));

app.use('/session', meditationController);
app.use('/', indexController);
app.use('/users', usersController);

app.listen(PORT, () => {
    console.log(`Life cannot be known by the mind:${PORT}`)
});