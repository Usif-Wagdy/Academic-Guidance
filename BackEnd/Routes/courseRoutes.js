const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const courseController = require("../Controllers/courseController");
const { imageUpload, videoUpload } = require('../Config/cloudinaryConfig');
const { authMiddleware, allowedTo } = require("../Middlewares/authMiddleware");


router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", authMiddleware, allowedTo('superAdmin', 'instructor', 'superInstructor'), courseController.createCourse);
router.patch("/:id", authMiddleware, allowedTo('superAdmin', 'instructor', 'superInstructor'), courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);
=======
const courseController = require('../Controllers/courseController');
const {
  imageUpload,
  videoUpload,
} = require('../Config/cloudinaryConfig');
const {
  authMiddleware,
  allowedTo,
} = require('../Middlewares/authMiddleware');
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.post(
  '/',
  authMiddleware,
  allowedTo('superAdmin', 'instructor', 'superInstructor'),
  courseController.createCourse,
);
router.patch(
  '/:id',
  authMiddleware,
  allowedTo('superAdmin', 'instructor', 'superInstructor'),
  courseController.updateCourse,
);
router.delete('/:id', courseController.deleteCourse);
>>>>>>> 1cbaa9b (add api for courses testimonial => (updated files: courseController && courseModel && courseRoutes))

router.post(
  '/:id',
  imageUpload.array('images', 3),
  courseController.addImage,
);

router.post(
  '/:courseId/curriculum/:curriculumIndex/parts/:partIndex/demo',
  videoUpload.single('video'),
  courseController.addVideo,
);

router.post(
  '/:id/testimonials',
  authMiddleware,
  courseController.addTestimonial,
);
router.delete(
  '/:id/testimonials/:testimonialId',
  courseController.deleteTestimonial,
);

module.exports = router;
