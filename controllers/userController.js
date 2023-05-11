const model = require('../models/user');
const Story = require('../models/itemModel');
const tradeItemModel = require('../models/itemModel.js');
const watchListItemModel = require('../models/watchlist');
const userTradeModel = require("../models/trade");
exports.new = (req, res)=>{
    console.log("in user controller");
    res.render('./user/new');
};

exports.create = (req, res, next) =>{
    let user = new model(req.body);
    console.log("I am in user: ", user);
    user.save()
    .then(()=> res.render('./user/login'))
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);  
            return res.redirect('/users/new');
        }

        if(err.code === 11000) {
            req.flash('error', 'Email has been used');  
            return res.redirect('/users/new');
        }
        
        next(err);
    });
}

exports.getUserLogin = (req, res, next) => {

    res.render('./user/login');
}

exports.login = (req, res, next)=>{

    let email = req.body.email;
    let password = req.body.password;
    console.log("creds are : =",email,password);
    model.findOne({ email: email })
    .then(user => {
        if (!user) {
            console.log('wrong email address');
            req.flash('error', 'wrong email address');  
            res.redirect('/user/login');
            } else {
                var gg = user.comparePassword(password)
                .then(result=>{
                    console.log("result is ", result);
                    if(result) {
                        req.session.user = user._id;
                        req.flash('success', 'You have successfully logged in');
                        res.redirect('/user/profile');
                    } else {
                        req.flash('error', 'wrong password');      
                        res.redirect('/user/login');
                    }
                });     
            }     
        })
    .catch(err => next(err));
};

exports.profile = async (req, res, next)=>{
    let id = req.session.user;
    let profileDataJson = {};
    // Promise.all([model.findById(id), Story.find({author: id})]) 
    // .then(results=>{
    //     const [user, stories] = results;
    //     res.render('./user/profile', {user, stories})
    // })
    // .catch(err=>next(err));

    // model.findById(id)
    // .then(user=>res.render('./user/profile',{user}))
    // .catch(err=>next(err))\

    tradeItemModel.find({ name: id })
    .then(tradeItems=>{
        if(tradeItems){
            profileDataJson['items'] = tradeItems;
        }else{
            console.log("No Items found");
        }
        
    })
    .catch(err=>next(err));

    model.findById(id)
    .then(user=>{
        if(user){
            profileDataJson['user'] = user;
            // console.log("Profiledatajson user is = ", profileDataJson);
        }else{
            let err = new Error('User not present, id:  '+id);
            err.status = 404;
            next(err);
        }
        
    })
    .catch(err=>next(err))

    try {
        const watchListItems = await watchListItemModel.find({ user: id, watchListStatus: true });
        if (watchListItems.length > 0) {
          profileDataJson["watchListItems"] = watchListItems;
          const tradeItemsArray = await Promise.all(
            watchListItems.map(async (eachItem) => {
              try {
                const item = await tradeItemModel.findById(eachItem.tradeitem);
                return item;
              } catch (error) {
                throw error;
              }
            })
          );
          profileDataJson["tradeItems"] = tradeItemsArray;
        }
        
        const userTradeItems = await userTradeModel.find({ user: req.session.user, tradeStatus:"Pending"});
        if (userTradeItems.length > 0) {
            profileDataJson["userTradeInfo"] = userTradeItems;
            const placedTradeItems = await Promise.all(
            userTradeItems.map(async (eachItem) => {
              try {
                const item = await tradeItemModel.findById(eachItem.tradeItem);
                return item;
              } catch (error) {
                throw error;
              }
            })
          );
          profileDataJson["placedTradeItems"] = placedTradeItems;
        }
        console.log("before rendering  = ", profileDataJson);
        res.render('./user/profile', { profileDataJson });
      } catch (error) {
        next(error);
      }
    

};

exports.logout = (req, res, next)=>{
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
   
 };