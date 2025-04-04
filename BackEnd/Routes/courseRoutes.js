const express = require("express");
const router = express.Router();
const courseController = require("../Controllers/courseController");
const { imageUpload, videoUpload } = require('../Config/cloudinaryConfig');

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.createCourse);
router.patch("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

console.log(courseController.addImage)
router.post(
    '/:id',
    imageUpload.array('images', 3),
    courseController.addImage
);

router.post(
    '/:courseId/curriculum/:curriculumIndex/parts/:partIndex/demo',
    videoUpload.single('video'),
    courseController.addVideo
);

module.exports = router;