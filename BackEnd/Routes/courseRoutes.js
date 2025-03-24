const express = require("express");
const router = express.Router();
const courseController = require("../Controllers/courseController");

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.post("/", courseController.createCourse);
router.patch("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);


module.exports = router;