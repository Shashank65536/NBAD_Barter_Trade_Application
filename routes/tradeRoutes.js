const express = require('express');
const { isLoggedIn,isHost,isGuest ,isTradeItemOwner} = require('../middleware/auth');
const router = express.Router();

const controller = require('../controllers/tradeController');
const{validateId, validateStory,validateResult} = require('../middleware/validator');

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

router.get('/:id/edit',validateId,isLoggedIn,isHost, controller.edit);

router.put('/:id',validateId,isLoggedIn, isHost,controller.update);

router.delete('/:id',validateId,isLoggedIn,isHost, controller.deleteItem);

router.get('/createForm',isLoggedIn,controller.create);

router.post('/',isLoggedIn,validateStory, validateResult,controller.save);

router.post('/watchlist/:id',validateId,controller.addToWatchList);

router.get('/abc/:id', validateId,controller.dev);

router.post('/unwatch/:id',validateId, controller.unwatch);

router.get('/myTrades/:id',validateId,isTradeItemOwner, controller.showMyTrades);

router.get('/placeTrade/:id',validateId,controller.placeTrade);

router.post('/cancelTrade/:id',validateId, controller.cancelTrade);

module.exports = router;