
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