const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userContrtoller');
const authController = require('../Controllers/authController');
const { authMiddleware, allowedTo } = require('../Middlewares/authMiddleware');
const { imageUpload } = require('../Config/cloudinaryConfig');
router.post('/signUp', authController.addUser);
router.post('/signIn', authController.login);

router.patch(
  '/update-image/:id',
  imageUpload.single('photo'),
  userController.addImage
);
router.patch('/update-user/:id', authMiddleware, userController.updateUser);
router.get('/', authMiddleware, allowedTo('superAdmin'), userController.getAllUsers);
router.get('/:id', authMiddleware, allowedTo('superAdmin'), userController.getUser);

router.get('/getStudents', authMiddleware, allowedTo('superAdmin'), userController.getStudents);
router.get('/getInstructors', authMiddleware, allowedTo('superAdmin'), userController.getInstructors);
router.delete('/:id', authMiddleware, allowedTo('superAdmin'), userController.deleteUser);


module.exports = router;