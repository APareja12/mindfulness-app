const express = require('express');
const meditateRouter = express.Router();
const Meditation = require("../models/tracker")


    
    // Index Route
    meditateRouter.get('/', (req, res) => { 
    const event = {
        date: new Date()}
         res.render('meditations/session.ejs', {
        event
    })
});

// New Route
meditateRouter.get('/new', (req, res) => {
    const event = {
        date: new Date()}
         res.render('meditations/new.ejs', {
        event
    })
});

// Delete Route
meditateRouter.delete("/:id", (req, res) => {
    Meditation.findByIdAndDelete(req.params.id, (err, deletedMeditation) => {
        
        res.redirect('/session/history')
    });
 });

// Update Route 
meditateRouter.put('/history/:id', (req, res) => {
Meditation.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true },
  (error, updateProduct) => {
    res.redirect(`/session/${req.params.id}`);
  }
);
});

// Create
meditateRouter.get('/history', (req, res) => {
    console.log(req.session)
    Meditation.find({}, (err, meditations) => {
       console.log(req.session.user)
        res.render('history.ejs', {
            user: req.session.user,
            meditations
        })
    })
})

meditateRouter.post('/', (req, res) => {
        Meditation.create(req.body, (err, meditations) => {
            res.redirect('/session/history');
        });
})

// Edit    
meditateRouter.get("/:id/edit", (req, res) => {
    Meditation.findById(req.params.id, (err, meditation) => {
        res.render("edit.ejs", {meditation});
    });
});
    

// SHOW
meditateRouter.get('/:id', (req, res) => {
    Meditation.findById(req.params.id, (err, meditation) => {
    res.render('show.ejs', { 
        
    meditation, 
    index:[req.params.id],
    });
});

});
module.exports = meditateRouter;