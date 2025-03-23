const express = require("express");
const router = express.Router();
const testimonialController = require("../Controllers/testimonialController");

router.get("/", testimonialController.getAllTestimonials);
router.post("/", testimonialController.createTestimonial);
router.delete("/:id", testimonialController.deleteTestimonial);
router.get("/course/:courseId", testimonialController.getTestimonialsByCourse);
module.exports = router;