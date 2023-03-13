const express = require('express');

const router = express.Router();
const controller = require('../controllers/mainController');

router.get('/', controller.homePage);

router.get('/about', controller.aboutPage);

router.get('/contact',controller.contactPage);

module.exports =router;
