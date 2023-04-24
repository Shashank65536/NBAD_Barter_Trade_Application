const express = require('express');
const morgan = require('morgan');
const tradeRoutes = require('./routes/tradeRoutes');
const mainRoutes = require('./routes/mainRoutes');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const app = express();


let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

//server
// app.listen(port,host,()=>{
//     console.log("Server is running");
// });

mongoose.connect('mongodb://127.0.0.1:27017/lenstrade',
                {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex: true})
.then(()=>{
    //start the server
    app.listen(port, host, () => {
        console.log('The server is running at port', port);
    });
})
.catch(err=>console.log(err.message));

app.use(
    session({
        secret: "dgjasdgkldas5875lejgr",
        resave: false,
        saveUninitialized: false,
        cookie: {maxAge: 60*60*1000},
        store: new MongoStore({mongoUrl: 'mongodb://127.0.0.1:27017/lenstrade'})
        })
);
app.use(flash());
app.use((req, res, next) => {
    console.log(req.session);
    res.locals.user = req.session.user||null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use('/', mainRoutes);
app.use('/trades', tradeRoutes);
app.use('/user', userRoutes);

app.use((req, res, next) =>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
})

app.use((err,req,res, next) => {

    console.log("I am in the error app.use");
    // console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");

    }
    res.status = (err.status);
    console.log("Status iss",res.status);
    console.log(err);
    
    res.render('error', {error:err});
});



