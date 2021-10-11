const express = require('express');
const meditateRouter = express.Router();
const Meditation = require("../models/tracker")

    
    // Index Route
    meditateRouter.get('/', (req, res) => { 
    const event = {
        date: new Date()}

    res.render('session.ejs', {
        event
    })
});

// New Route
meditateRouter.get('/new', (req, res) => {
    res.render('new.ejs');
});

// Delete Route
meditateRouter.delete("/:id", (req, res) => {
    Meditation.findByIdAndDelete(req.params.id, (err, deletedMeditation) => {
        
        res.redirect('/')
    });
 });

// Update Route 
meditateRouter.put('/update/:id', (req, res) => {
Meditation.findByIdAndUpdate(
  req.params.id,
  req.body,
  { new: true },
  (error, updateProduct) => {
    res.redirect(`/session/update/${req.params.id}`);
  }
);
});

// Create
meditateRouter.get('/history', (req, res) => {
    res.render('history.ejs')
})

meditateRouter.post('/', (req, res) => {
        Meditation.create(req.body);
    res.redirect('/session/history');
})

// Edit    
meditateRouter.get("/:id/edit", (req, res) => {
    console.log(req.params.id)
    Meditation.findById(req.params.id, (error, foundMeditation) => {
        res.render("edit.ejs", {foundMeditation});
    });
});
    

// SHOW
meditateRouter.get('/:id', (req, res) => {
    // console.log(products/:id),
    Meditation.findById(req.params.id, (error, foundMeditation) => {
    res.render('show.ejs', { 
    foundMeditation, 
    index:[req.params.id],
    });
});

});
module.exports = meditateRouter;