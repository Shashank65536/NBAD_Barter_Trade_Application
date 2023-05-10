const tradeItemModel = require("../models/itemModel.js");

//check if user already exists
exports.isGuest = (req, res, next)=>{
    if(!req.session.user){
        return next();
    } else {
        req.flash('error','You are already logged in!!!');
        return res.redirect('/users/profile');
    }
};

//check if user is authenticated
exports.isLoggedIn = (req, res, next)=>{
    if(req.session.user){
        return next();
    } else {
        req.flash('error','You need to log in first!!!');
        return res.redirect('/users/login');
    }
};

//check if user is host of the connection
exports.isHost = (req, res, next)=>{
    let id = req.params.id;
    tradeItemModel.findById(id)
    .then(item => {
        if(item){
            if(item.name == req.session.user){
                return next();
            } else {
                let err = new Error('Unauthorized to access the resource');
                err.status = 401;
                return next(err);
            }
        }
    })
    .catch(err=>next(err));
};