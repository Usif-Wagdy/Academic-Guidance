const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    profilePic: { type: String, required: true, trim: true },
    testimonial: { type: String, required: true, trim: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
}, { timestamps: true });

module.exports = mongoose.model("Testimonial", testimonialSchema);