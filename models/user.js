const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const goalSchema = new Schema({user});




const User = mongoose.model('User', userSchema);
module.exports = User;