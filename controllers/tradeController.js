const express = require('express');
const tradeItemModel = require('../models/itemModel.js');

exports.tradeCategories = (req, res) =>{
    // res.send ('Display all the stories.');
    let categories = tradeItemModel.getAllCategories();
    console.log("in controller = ",categories);
    res.render('./tradeItem/trades',{categories});
};

exports.showAllItems = (req,res,next) =>{
    
    let items = tradeItemModel.getAllItems();
    console.log("all items are ", items);
    console.log(items instanceof Array);
    if(items.length > 0){
        res.render('./tradeItem/trade',{items});
    }else{
        let err = new Error('Trade items are empty!!!!!!!!!!!!!!');
        err.status = 404;
        next(err);
    }
    
};

exports.displayCategoryItems = (req,res,next) =>{
    
    let id = req.params.category_id;
    console.log("In displayCategoryItems id is", id);
    let items = tradeItemModel.getItemByCategoryId(id);
    // console.log("all items are ", items);
    // console.log(items instanceof Array);
    if(items.length > 0){
        res.render('./tradeItem/trade',{items});
    }else{
        let err = new Error('Trade items are empty!!!!!!!!!!!!!!');
        err.status = 404;
        next(err);
    }
    
};

// exports.displayCategoryItems = (req,res)=>{
//     let id = req.params.category_id;
//     console.log('id is = ',id);
//     let itemsArr = tradeItemModel.getAllItems();
//     // console.log("Item found by category is:",itemsArr);
//     if(itemsArr.length > 0){
//         console.log('items is in displayCategoryItems =',itemsArr);
//         // res.render('./tradeItem/trade',{itemsArr});
//         res.render('./tradeItem/trade',{itemsArr});
//     }


// };

exports.getItemDetails = (req,res) => {
    let id = req.params.itemId;
    //  console.log("id is ",id);
    let item = tradeItemModel.getItemDetailsByItemId(id);
    // console.log("the trade item is ", item);
    if(item){
        res.render('./tradeItem/executeTrade',{item});
    }else{
        console.log("Error item not found");
    }
}

exports.deleteItem = ((req,res,next) =>{
    let id = req.params.id;
    // res.send('Delete the story');
    if (tradeItemModel.deleteById(id)){
        res.redirect('/trades/allItems');
    }else{
        // let err = new Error('Cannot find a story with id  ' + id);
        // err.status = 404;
        // next(err);
        console.log("Error during deleting the item");
    }

})

exports.edit = (req, res, next) =>{
    // res.send ('Send edit form .');
    let id = req.params.id;
    let eachItem = tradeItemModel.getItemDetailsByItemId(id);
    if (eachItem){
        res.render('./tradeItem/updateForm',{eachItem})
    }else{
        let err = new Error('Cannot find a item with id  ' + id);
        err.status = 404;
        next(err);
    }
    
};

exports.update =  (req, res, next) =>{
    // res.send ('update the story with id'); 
    console.log("I am in the update function");
    let item = req.body;
    console.log(item);
    console.log(req.params.id);

    if(tradeItemModel.updateById(req.params.id,item)){
        res.redirect('/trades/allItems');
    }else{
        let err = new Error('Cannot find a story with id  ' + id);
        err.status = 404;
        next(err);
    }


    // let id = req.params.id;

    // if(model.updateById(id,story)){
    //     res.redirect('/stories/' + id);
    // }else{
    //     let err = new Error('Cannot find a story with id  ' + id);
    //     err.status = 404;
    //     next(err);
    // }
};

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
