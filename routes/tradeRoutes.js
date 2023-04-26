const express = require('express');
const { isLoggedIn } = require('../middleware/auth');
const router = express.Router();

const controller = require('../controllers/tradeController');


router.get('/new', (req,res) =>{
    res.send('Send a new form');
});

router.get('/tradeCategories',isLoggedIn, controller.tradeCategories);

router.get('/allItems',isLoggedIn, controller.showAllItems);

router.get('/tradeCategories/:category_id', isLoggedIn,controller.displayCategoryItems);

router.get('/showTrade/:itemId',isLoggedIn, controller.getItemDetails);

// router.get('/:id',(req,res) =>{
//     res.send('Send the item with the id');
// });

router.get('/:id/edit',isLoggedIn, controller.edit);

router.put('/:id',isLoggedIn, controller.update);

router.delete('/:id',isLoggedIn, controller.deleteItem);

router.get('/createForm',isLoggedIn,controller.create);

router.post('/',isLoggedIn,controller.save);

module.exports = router;