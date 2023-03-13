const express = require('express');

const router = express.Router();

const controller = require('../controllers/tradeController');


router.get('/new', (req,res) =>{
    res.send('Send a new form');
});

router.get('/tradeCategories', controller.tradeCategories);

router.get('/tradeCategories/all', controller.showAllItems);

router.get('/tradeCategories/:category_id', controller.displayCategoryItems);

router.get('/:id',(req,res) =>{
    res.send('Send the item with the id');
});

router.get('/:id/edit', (req,res) =>{
    res.send('Send a edit form');
});

router.put('/:id', (req,res) =>{
    res.send('Update the story');
});

router.delete('/:id', (req,res) =>{
    res.send('Delete the story');
});

module.exports = router;