const express = require('express');
const controller = require('../controllers/userController');
// const { isExist, checkLogIn } = require('../middleware/middleware');

const router = express.Router();

//users: create a new user account
router.post('/', controller.create);

//users/new: send html form for creating a new user account
router.get('/new', controller.new);

// //GET /users/login: send html for logging in
router.get('/login', controller.getUserLogin);

// //users/login: authenticate user's login
// router.post('/login', isExist, controller.login);

// //users/profile: send user's profile page
// router.get('/profile', checkLogIn, controller.profile);

// //users/logout: logout a user
// router.get('/logout', checkLogIn, controller.logout);

module.exports = router;