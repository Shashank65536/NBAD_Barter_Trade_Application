const model = require('../models/user');
const Story = require('../models/itemModel');

exports.new = (req, res)=>{
    console.log("in user controller");
    res.render('./user/new');
};

exports.create = (req, res, next) =>{
    let user = new model(req.body);
    console.log("I am in user: ", user);
    user.save()
    .then(()=> res.render('./user/login'))
    .catch(err=>next(err));
}

exports.getUserLogin = (req, res, next) => {

    res.render('./user/login');
}