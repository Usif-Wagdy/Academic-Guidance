const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userContrtoller');
const authController = require('../Controllers/authController');
const { authMiddleware, allowedTo } = require('../Middlewares/authMiddleware');
const { imageUpload, videoUpload } = require('../Config/cloudinaryConfig');
router.post('/signUp', authController.addUser);
router.post('/signIn', authController.login);

router.patch(
  '/update-image/:id',
  imageUpload.single('photo'),
  userController.addImage
);

router.get('/', authMiddleware, allowedTo('admin'), userController.getAllUsers);
router.get('/getStudents', authMiddleware, allowedTo('admin'), userController.getStudents);
router.get('/getInstructors', authMiddleware, allowedTo('admin'), userController.getInstructors);

module.exports = router;