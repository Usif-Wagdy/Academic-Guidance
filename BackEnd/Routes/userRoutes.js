const express = require('express');
const router = express.Router();

const userController = require('../Controllers/userContrtoller');
const authController = require('../Controllers/authController');
const { authMiddleware, allwedTo } = require('../Middlewares/authMiddleware');
const { upload } = require('../Config/cloudinaryConfig');

router.post('/signUp', authController.addUser);
router.post('/signIn', authController.login);
router.patch(
  '/update-image/:id',
  upload.single('photo'),
  userController.addImage,
);
router.patch(
  '/updateUser/:id',
  authMiddleware,
  userController.updateUser,
);

module.exports = router;