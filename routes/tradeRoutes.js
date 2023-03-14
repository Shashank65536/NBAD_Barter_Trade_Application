const express = require('express');

const router = express.Router();

const controller = require('../controllers/tradeController');


router.get('/new', (req,res) =>{
    res.send('Send a new form');
});

router.get('/tradeCategories', controller.tradeCategories);

router.get('/allItems', controller.showAllItems);

router.get('/tradeCategories/:category_id', controller.displayCategoryItems);

router.get('/showTrade/:itemId', controller.getItemDetails);

router.get('/:id',(req,res) =>{
    res.send('Send the item with the id');
});

router.get('/:id/edit', controller.edit);

router.put('/:id', (req,res,next) =>{
    res.send('Update the story');
});

router.delete('/:id', controller.deleteItem);

module.exports = router;