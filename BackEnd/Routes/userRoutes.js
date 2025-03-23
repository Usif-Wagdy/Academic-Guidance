const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userContrtoller');
const authController = require('../Controllers/authController');
const authMiddleware = require('../Middlewares/authMiddleware');
router.post('/signUp', authController.addUser);

router.post('/signIn', authController.login);


module.exports = router;