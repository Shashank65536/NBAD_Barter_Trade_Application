const express = require("express");
const tradeItemModel = require("../models/itemModel.js");
const userModel = require("../models/user.js");
const { v4: uuidv4 } = require("uuid");
const { DateTime } = require("luxon");
const watchListItemModel = require("../models/watchlist");
const userTradeModel = require("../models/trade");
exports.tradeCategories = (req, res) => {
  // res.send ('Display all the stories.');

  // let categories = tradeItemModel.getAllCategories();
  categories = [];
  tradeItemModel
    .find()
    .then((tradeItems) => {
      tradeItems.forEach((item) => {
        tempCategory = {};
        tempCategory["category"] = item.category;
        tempCategory["category_id"] = item.category_id;
        categories.push(tempCategory);
      });
      console.log(categories);
      console.log(categories.length);
      res.render("./tradeItem/trades", { categories });
    })
    .catch((err) => {
      let err1 = new Error("Trade items are empty!!!!!!!!!!!!!!");
      err1.status = 404;
      next(err1);
    });
};

exports.showAllItems = (req, res, next) => {
  tradeItemModel
    .find()
    .then((items) => {
      console.log(items);
      res.render("./tradeItem/trade", { items });
    })
    .catch((err) => {
      let err1 = new Error("Trade items are empty!!!!!!!!!!!!!!");
      err1.status = 404;
      next(err1);
    });
};

exports.displayCategoryItems = (req, res, next) => {
  let id = req.params.category_id;
  console.log("In displayCategoryItems id is", id);
  tradeItemModel.find().then(async (tradeItems) => {
    let items = [];
    let fullName = "";
    console.log("In models id is = ", id);
    reqItem = tradeItems.find((item) => item.category_id === id);

    const result = await new Promise((resolve, reject) => {
      userModel
        .findById(reqItem.name)
        .then((eachUser) => {
          resolve(eachUser);
        })
        .catch((err) => reject(err));
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
    console.log("In display category items", reqItem);
    items.push(reqItem);
    console.log("In getItemByCategoryId ", items);
    if (items.length > 0) {
      res.render("./tradeItem/trade", { items });
    } else {
      let err = new Error("Trade items are empty!!!!!!!!!!!!!!");
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

exports.getItemDetails = (req, res) => {
  let id = req.params.itemId;
  console.log("id is ", id);

  tradeItemModel
    .find()
    .then(async (items) => {
      let item = items.find((item) => item.id === id);
      console.log("in getItemDetails item is:", item);
      const result = await new Promise((resolve, reject) => {
        userModel
          .findById(item.name)
          .then((eachUser) => {
            resolve(eachUser);
          })
          .catch((err) => reject(err));
      });
      console.log("in getItemDetails result is:", result);
      item.name = result;
      console.log("in getItemDetails = ", item);

      res.render("./tradeItem/executeTrade", { item });
    })
    .catch((err) => {
      next(err);
    });
  // let item = tradeItemModel.getItemDetailsByItemId(id);
  // // console.log("the trade item is ", item);
  // if(item){
  //     res.render('./tradeItem/executeTrade',{item});
  // }else{
  //     console.log("Error item not found");
  // }
};

exports.deleteItem = (req, res, next) => {
  let id = req.params.id;
  // res.send('Delete the story');
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("invalid id");
    err.status = 400;
    return next(err);
  }

  tradeItemModel
    .findByIdAndDelete(id, { useFindAndModify: false })
    .then((item) => {
      if (item) {
        res.redirect("/trades/allItems");
      } else {
        let err = new Error("Story not present with id:   " + id);
        err.status = 404;
        return next(err);
      }
    })
    .catch((err) => next(err));
};

exports.edit = (req, res, next) => {
  // res.send ('Send edit form .');
  let id = req.params.id;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("invalid id");
    err.status = 400;
    return next(err);
  }

  tradeItemModel
    .findById(id)
    .then((eachItem) => {
      if (eachItem) {
        return res.render("./tradeItem/updateForm", { eachItem });
      } else {
        let err = new Error("Cannot find a item with id  " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => next(err));

  // let eachItem = tradeItemModel.getItemDetailsByItemId(id);
  // if (eachItem){
  //     res.render('./tradeItem/updateForm',{eachItem})
  // }else{
  //     let err = new Error('Cannot find a item with id  ' + id);
  //     err.status = 404;
  //     next(err);
  // }
};

exports.update = (req, res, next) => {
  // res.send ('update the story with id');
  let id = req.params.id;
  let requestBodyItem = req.body;
  console.log(requestBodyItem);
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    let err = new Error("invalid id");
    err.status = 400;
    return next(err);
  }
  tradeItemModel
    .findByIdAndUpdate(id, requestBodyItem, {
      useFindAndModify: false,
      runValidators: true,
    })
    .then((item) => {
      if (item) {
        res.redirect("/trades/showTrade/" + id);
      } else {
        let err = new Error("Story not present, id:  " + id);
        err.status = 404;
        next(err);
      }
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};

exports.create = (req, res, next) => {
  console.log("in create");
  res.render("./tradeItem/new");
};

exports.save = (req, res, next) => {
  console.log("in save");

  let item = req.body;
  item.name = req.session.user;

  let uuid = uuidv4();
  console.log("in models save ");
  // item["createdAt"] =  DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
  item["category_id"] = uuid;
  item["status"] = "active";
  if (!item["image"]) {
    item["image"] =
      "https://res.cloudinary.com/liingo/image/upload/c_fill,g_center,h_339,w_990,q_85/754317179262_2.jpg";
  }

  console.log("item to be pushed", item);

  let newModel = new tradeItemModel(item);
  newModel
    .save()
    .then((item) => res.redirect("/trades/allItems"))
    .catch((err) => {
      if (err.name === "ValidationError") {
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

exports.dev =  (req, res, next) => {

    console.log("session keys are - ", req.session.user," ", req.session.tradeItemId );

    let t = req.session.tradeItemId;
    let userItemId = req.params.id;
    let status = "Pending";
    let user = req.session.user;

    let requestJson = {};

    requestJson['user'] = user;
    requestJson['userItem'] = userItemId;
    requestJson['tradeItem'] = t;
    requestJson['tradeStatus'] = status;
    let newModel = new userTradeModel(requestJson);
    
    userTradeModel.find({user:req.session.user,tradeItem:t})
    .then( existingItems=>{
        console.log("existing items are = ",existingItems);
        if(existingItems == null || existingItems.length === 0){
            newModel
            .save()
            .then((item) => res.redirect("/user/profile/"))
            .catch((err) => {
              if (err.name === "Item not Found Error") {
                err.status = 400;
              }
              next(err);
            });
        }else{
            console.log('display flash');
            req.flash('error', 'You cannot place multiple trades with same item!'); 
        }
    })


    // let userId = req.params.id;
    // let profileDataJson = {};
    // watchListItemModel.find({user:userId})
    // .then((items)=>{
    //     if (items.length > 0) {
    //         profileDataJson["watchListItems"] = items;
    //         console.log("aa ",profileDataJson);
    //         // Create an array of promises for fetching trade items
    //         const promises = items.map((eachItem) => {
    //           return new Promise((resolve, reject) => {
    //             tradeItemModel
    //               .findById(eachItem.tradeitem)
    //               .then((item) => {
    //                 resolve(item);
    //               })
    //               .catch((err) => reject(err));
    //           });
    //         });
          
    //         // Wait for all promises to resolve using Promise.all()
    //         Promise.all(promises)
    //           .then((tradeItemsArray) => {
    //             profileDataJson["tradeItems"] = tradeItemsArray;
    //             console.log("final ", profileDataJson);
    //           })
    //           .catch((error) => {
    //             console.log("Error fetching trade items:", error);
    //           });
    //       }
    // })
    // .catch(err=>next(err))
};

exports.addToWatchList = (req, res, next) => {
  let itemId = req.params.id;
  let userId = req.session.user;
  let watchListItem = {};
  watchListItemModel
    .find({ tradeitem: itemId })
    .then((item) => {
        console.log("item is : ",item);
        watchListItem["user"] = userId;
        watchListItem["tradeitem"] = itemId;
        watchListItem["watchListStatus"] = true;
        watchListItem["tradeStatus"] = "NA";
      
      console.log(watchListItem);
      let watchlistObject = new watchListItemModel(watchListItem);
      watchlistObject
        .save()
        .then((item) => res.redirect("/user/profile"))
        .catch();
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        err.status = 400;
      }
      next(err);
    });
};


exports.unwatch = (req, res, next) => {
    // res.send ('update the story with id');
    let watchListItemId = req.params.id;

    let requestJson = {};
    requestJson['watchListStatus'] = false;
    // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    //   let err = new Error("invalid id");
    //   err.status = 400;
    //   return next(err);
    // }
    watchListItemModel
      .findByIdAndUpdate(watchListItemId, requestJson, {
        useFindAndModify: false,
        runValidators: true,
      })
      .then((item) => {
        if (item) {
          res.redirect("/user/profile/");
        } else {
          let err = new Error("Watchlist Item not present, check watchListitems collection co, id:");
          err.status = 404;
          next(err);
        }
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          err.status = 400;
        }
        next(err);
      });
  };


exports.showMyTrades = (req, res, next) =>{
    let userId = req.session.user;
    let tradeItemId = req.params.id;

    req.session.tradeItemId = tradeItemId;
    console.log("checking the session storage, ",req.session.tradeItemId);
    tradeItemModel.find({name:userId})
    .then((items)=>{
        console.log("user items = ",items);
        if(items){
            res.render("./tradeItem/myTrades", { items });
        }
    })
    .catch(err=>next(err));
}

exports.placeTrade =  async (req, res, next) => {

    console.log("session keys are - ", req.session.user," ", req.session.tradeItemId );

    let t = req.session.tradeItemId;
    let userItemId = req.params.id;
    let status = "Pending";
    let user = req.session.user;

    let requestJson = {};

    requestJson['user'] = user;
    requestJson['userItem'] = userItemId;
    requestJson['tradeItem'] = t;
    requestJson['tradeStatus'] = status;


    await tradeItemModel.findById(t)
    .then(item=>{
      console.log("in placetrade = ",item);
      if(item){
        requestJson['recipient'] = item.name;
      }
    });

    let newModel = new userTradeModel(requestJson);
    
    userTradeModel.find({user:req.session.user,tradeItem:t,tradeStatus:"Pending"})
    .then( async existingItems=>{
        console.log("existing items are = ",existingItems);
        if (existingItems == null || existingItems.length === 0) {
            await newModel.save();
            res.redirect("/user/profile/");
          } else {
            console.log('display flash');
            let err = new Error("You cannot place multiple trades with the same item!");
            err.status = 409;
            next(err);
            req.flash('error', 'You cannot place multiple trades with the same item!');
          }
    })
};


exports.cancelTrade = (req,res,next) =>{
    let tradeItemId = req.params.id;
    let user = req.session.user;

    // console.log("user is is ",user);
    // console.log("tradeItem is ",tradeItemId);
    let requestJson = {};
    requestJson['tradeStatus'] = "Cancel";

    // userTradeModel.find({user:user,tradeItem:tradeItemId})
    // .then(i=>{console.log("found item is - ", i)})
    // .catch(err=>next(err));

    console.log("updated status is = ",requestJson);
    userTradeModel
      .findOneAndUpdate({user:user,tradeItem:tradeItemId,tradeStatus:"Pending"}, requestJson, {
        useFindAndModify: false,
        runValidators: true,
      })
      .then((item) => {
        if (item) {
          res.redirect("/user/profile/");
        } else {
          let err = new Error("trade Item not present with , id:",tradeItemId);
          err.status = 404;
          next(err);
        }
      })
      .catch((err) => {
        if (err.name === "Trade Item Deletion error") {
          err.status = 400;
        }
        next(err);
      });
}