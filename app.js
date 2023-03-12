const express = require('express');
const morgan = require('morgan');

const app = express();

let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');