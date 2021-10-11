const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const trackerSchema = new Schema({
    name: String,
    date: Number,
    duration: Number,
    typeOfMeditation: {
        type: String, 
        enum: ['Zen', 'Vipassana', 'Kundalini', 'Visualization']
        },
    intention: String,
    setting: String,
}, {
    timestamps: true
});

const Meditation = mongoose.model('Meditation', trackerSchema);

module.exports = Meditation;