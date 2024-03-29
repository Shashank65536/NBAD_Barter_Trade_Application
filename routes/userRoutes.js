const express = require('express');
const controller = require('../controllers/userController');
const { isGuest,isLoggedIn } = require('../middleware/auth');
const {logInLimiter} = require('../middleware/rateLimiters');
const router = express.Router();
const {validateSignUp, validateLogIn, validateResult} = require('../middleware/validator');
//users: create a new user account
router.post('/',isGuest,validateSignUp, validateResult,controller.create);

//users/new: send html form for creating a new user account
router.get('/new',isGuest, controller.new);

// //GET /users/login: send html for logging in
router.get('/login',isGuest, controller.getUserLogin);

// //users/login: authenticate user's login
router.post('/login',logInLimiter,isGuest, validateLogIn, validateResult,controller.login);

// //users/profile: send user's profile page
router.get('/profile', isLoggedIn,controller.profile);

// //users/logout: logout a user
router.get('/logout', isLoggedIn,controller.logout);

module.exports = router;