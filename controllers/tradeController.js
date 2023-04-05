const express = require('express');
const tradeItemModel = require('../models/itemModel.js');

exports.tradeCategories = (req, res) =>{
    // res.send ('Display all the stories.');
    
    // let categories = tradeItemModel.getAllCategories();
    categories = [];
    tradeItemModel.find().then(tradeItems =>{
        tradeItems.forEach(item =>{
        tempCategory = {};
        tempCategory["category"] = item.category;
        tempCategory["category_id"] = item.category_id;
        categories.push(tempCategory);
        
    });
    console.log(categories);
    console.log(categories.length);
    res.render('./tradeItem/trades',{categories});
}).catch(err=>{
    let err1 = new Error('Trade items are empty!!!!!!!!!!!!!!');
    err1.status = 404;
    next(err1);
});
};


exports.showAllItems = (req,res,next) =>{
    
    tradeItemModel.find()
    .then(items=> res.render('./tradeItem/trade',{items}))
    .catch(err=>{
        let err1 = new Error('Trade items are empty!!!!!!!!!!!!!!');
        err1.status = 404;
        next(err1);
    });
};

exports.displayCategoryItems = (req,res,next) =>{
    
    let id = req.params.category_id;
    console.log("In displayCategoryItems id is", id);
    tradeItemModel.find()
    .then(tradeItems=>{
        let items = [];
        console.log("In models id is = ",id);
        reqItem = tradeItems.find(item => item.category_id === id);
        items.push(reqItem);
        console.log("In getItemByCategoryId ",items);
        if(items.length > 0){
            res.render('./tradeItem/trade',{items});
        }else{
            let err = new Error('Trade items are empty!!!!!!!!!!!!!!');
            err.status = 404;
            next(err);
        }
    });
    
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
    console.log("id is ",id);

    tradeItemModel.find()
    .then(items => {
        let item = items.find(item => item.id === id);
        res.render('./tradeItem/executeTrade',{item});
        
    }).catch(err => {
        next(err);
    });
    // let item = tradeItemModel.getItemDetailsByItemId(id);
    // // console.log("the trade item is ", item);
    // if(item){
    //     res.render('./tradeItem/executeTrade',{item});
    // }else{
    //     console.log("Error item not found");
    // }
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

};

exports.create = (req,res,next) =>{
    console.log("in create");
    res.render('./tradeItem/new')
};

exports.save = (req,res,next) => {
    console.log("in save");

    let body = req.body;
    console.log(body);
    if(tradeItemModel.save(body)){
        res.redirect('/trades/allItems');
    }else{
        let err = new Error('Cannot find a story with id  ' + id);
        err.status = 404;
        next(err);
    }
    
};

