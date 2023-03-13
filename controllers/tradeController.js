const express = require('express');
const tradeItemModel = require('../models/itemModel.js');

exports.tradeCategories = (req, res) =>{
    // res.send ('Display all the stories.');
    let categories = tradeItemModel.getAllCategories();
    console.log("in controller = ",categories);
    res.render('./tradeItem/trades',{categories});
};

exports.showAllItems = (req,res) =>{
    
    let items = tradeItemModel.getAllItems();
    console.log("all items are ", items.length);
    res.render('./tradeItem/trade',{items});
};

exports.displayCategoryItems = (req,res)=>{
    let id = req.params.category_id;
    console.log('id is = ',id);
    let items = tradeItemModel.getItemByCategoryId(id);
    console.log('items is in displayCategoryItems =',items);
    res.render('./tradeItem/trade',{items});

};

exports.getItemDetails = (itemId) => {
    let item = tradeItemModel.getItemDetailsByItemId(itemId);
    if(item){
        res.render('./tradeItem/executeTrade',{item});
    }else{
        console.log("Error item not found");
    }
}

// exports.new  = (req, res) => {
//     res.render('./story/new');
// };

// exports.create =  (req, res) =>{
//     // res.send ('create a new story.');
//     let story = req.body;
//     model.save(story);
//     res.redirect('/stories');
// };

// exports.show =  (req, res, next) =>{
//     let id = req.params.id;
//     let story = model.findById(id);
//     if (story){
//         res.render('./story/show',{story})
//     }else{
//         let err = new Error('Cannot find a story with id  ' + id);
//         err.status = 404;
//         next(err);
//     }
    
    
// };

// exports.edit = (req, res, next) =>{
//     // res.send ('Send edit form .');
//     let id = req.params.id;
//     let story = model.findById(id);
//     if (story){
//         res.render('./story/edit',{story})
//     }else{
//         let err = new Error('Cannot find a story with id  ' + id);
//         err.status = 404;
//         next(err);
//     }
    
// };

// exports.update =  (req, res, next) =>{
//     // res.send ('update the story with id'); 
//     let story = req.body;
//     // console.log(story);
//     let id = req.params.id;

//     if(model.updateById(id,story)){
//         res.redirect('/stories/' + id);
//     }else{
//         let err = new Error('Cannot find a story with id  ' + id);
//         err.status = 404;
//         next(err);
//     }
// };

// exports.delete = (req, res, next) =>{
//     // res.send ('delete the story');
//     let id = req.params.id;

//     if (model.deleteById(id)){
//         res.redirect('/stories');
//     }else{
//         let err = new Error('Cannot find a story with id  ' + id);
//         err.status = 404;
//         next(err);
//     }
// };
