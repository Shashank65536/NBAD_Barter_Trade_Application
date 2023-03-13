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

