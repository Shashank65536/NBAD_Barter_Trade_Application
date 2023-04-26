const express = require('express');
const tradeItemModel = require('../models/itemModel.js');
const userModel = require('../models/user.js');
const {v4: uuidv4} = require('uuid');
const {DateTime} = require("luxon");

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
    .then(items=>{
        console.log(items);
        res.render('./tradeItem/trade',{items})
    })
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
    .then(async tradeItems=>{
        let items = [];
        let fullName = '';
        console.log("In models id is = ",id);
        reqItem = tradeItems.find(item => item.category_id === id);
        
        const result = await new Promise((resolve,reject)=>{
            userModel.findById(reqItem.name)
            .then(eachUser=>{
                resolve(eachUser);
            }).catch(err=>reject(err))
        });
        console.log("result is ", result);
        // setTimeout(() => {
        //     // Do something after waiting for some time
        //     userModel.findById(reqItem.name)
        //     .then(eachUser =>{
        //     console.log("each user is:",eachUser);
        //     reqItem.name = eachUser;
        // })
        //   }, 1000);
        
        reqItem.name = result;
        console.log('In display category items',reqItem);
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
    .then(async items => {
        let item = items.find(item => item.id === id);
        console.log("in getItemDetails item is:",item);
        const result = await new Promise((resolve,reject)=>{
            userModel.findById(item.name)
            .then(eachUser=>{
                resolve(eachUser);
            }).catch(err=>reject(err))
        });
        console.log("in getItemDetails result is:",result);
        item.name = result;
        console.log("in getItemDetails = ",item);

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
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('invalid id');
        err.status = 400;
        return next(err);
    }

    tradeItemModel.findByIdAndDelete(id, {useFindAndModify: false}) 
    .then(item=>{
        if(item){
            res.redirect('/trades/allItems');
        }else{
            let err = new Error('Story not present with id:   '+id);
            err.status = 404;
            return next(err);
        }
    })
    .catch(err=>next(err));
    
})

exports.edit = (req, res, next) =>{
    // res.send ('Send edit form .');
    let id = req.params.id;
    
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('invalid id');
        err.status = 400;
        return next(err);
    }

    tradeItemModel.findById(id)
    .then(eachItem=>{
        if(eachItem){
            return res.render('./tradeItem/updateForm',{eachItem});
        }else{
            let err = new Error('Cannot find a item with id  ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));



    // let eachItem = tradeItemModel.getItemDetailsByItemId(id);
    // if (eachItem){
    //     res.render('./tradeItem/updateForm',{eachItem})
    // }else{
    //     let err = new Error('Cannot find a item with id  ' + id);
    //     err.status = 404;
    //     next(err);
    // }
    
};

exports.update =  (req, res, next) =>{
    // res.send ('update the story with id'); 
    let id = req.params.id;
    let requestBodyItem = req.body;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('invalid id');
        err.status = 400;
        return next(err);
    }
    tradeItemModel.findByIdAndUpdate(id, requestBodyItem,{useFindAndModify: false, runValidators: true})
    .then(item=>{
        if(item){
            res.redirect('/trades/showTrade/'+id);
        }else{
            let err = new Error('Story not present, id:  '+id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });

};

exports.create = (req,res,next) =>{
    console.log("in create");
    res.render('./tradeItem/new')
};

exports.save = (req,res,next) => {
    console.log("in save");

    let item = req.body;
    item.name = req.session.user;


    let uuid = uuidv4();
    console.log("in models save ");
    // item["createdAt"] =  DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    item["category_id"] =uuid;
    item["status"] = "active";
    item["image"] = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ7Q8BQHDT8SWf_uR3v_lcoVmY8Yu9DgO33w&usqp=CAU";
    console.log("item to be pushed",item);

    let newModel = new tradeItemModel(item);
    newModel.save()
    .then(item=>res.redirect('/trades/allItems'))
    .catch(err=>{
        if(err.name === 'ValidationError'){
            err.status = 400;
        }
        next(err);
    });
    // if(tradeItemModel.save(item)){
    //     res.redirect('/trades/allItems');
    // }else{
    //     let err = new Error('Cannot find a story with id  ' + id);
    //     err.status = 404;
    //     next(err);
    // }
    
};

