const express = require('express');
const router = express.Router();
const blogController = require('../Controllers/blogController');
const { authMiddleware, allwedTo } = require('../Middlewares/authMiddleware');
const { imageUpload } = require('../Config/cloudinaryConfig');

router.get('/', blogController.getAllBlogs);
router.get('/:id', blogController.getBlogById);
router.post('/', imageUpload.single('image'), blogController.createBlog);
router.delete('/:id', authMiddleware, blogController.deleteBlog);
router.patch('/:id', authMiddleware, blogController.updateBlog);

module.exports = router;