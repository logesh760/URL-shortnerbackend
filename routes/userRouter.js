const express = require('express');
const { registerNewuser,loginUser,logoutUser } = require('../controller/userController');  // Correct import

const router = express.Router();

// POST route for user signup
router.post('/signup', registerNewuser);   // Correct callback function

router.post('/login',loginUser)

router.post('/logout',logoutUser)
module.exports = router;
