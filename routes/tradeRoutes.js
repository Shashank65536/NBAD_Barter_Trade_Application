const express = require('express');
const { isLoggedIn,isHost,isGuest } = require('../middleware/auth');
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

router.get('/:id/edit',isLoggedIn,isHost, controller.edit);

router.put('/:id',isLoggedIn, isHost,controller.update);

router.delete('/:id',isLoggedIn,isHost, controller.deleteItem);

router.get('/createForm',isLoggedIn,controller.create);

router.post('/',isLoggedIn,controller.save);

router.post('/watchlist/:id',controller.addToWatchList);

router.get('/abc/:id', controller.dev);

router.post('/unwatch/:id', controller.unwatch);

module.exports = router;