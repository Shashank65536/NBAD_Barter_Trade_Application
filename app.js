const express = require('express');
const morgan = require('morgan');
const tradeRoutes = require('./routes/tradeRoutes');
const mainRoutes = require('./routes/mainRoutes');
const methodOverride = require('method-override');

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
app.listen(port,host,()=>{
    console.log("Server is running");
});

//routes
// app.get('/', (req, res) => {
//     res.render('index');
// })

app.use('/', mainRoutes);
app.use('/trades', tradeRoutes);

app.use((req, res, next) =>{
    let err = new Error('The server cannot locate ' + req.url);
    err.status = 404;
    next(err);
})

app.use((err,req,res, next) => {

    console.log("I am in the error ka app.use");
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

