const Testimonial = require("../Models/TestimonialModel");

exports.createTestimonial = async (req, res) => {
    try {
        const { name, profilePic, testimonial, courseId } = req.body;

        if (!name || !profilePic || !testimonial || !courseId) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const newTestimonial = new Testimonial({ name, profilePic, testimonial, courseId });
        await newTestimonial.save();
        res.status(201).json({ success: true, message: "Testimonial added successfully.", testimonial: newTestimonial });
    } catch (error) {
        console.error("Error adding testimonial:", error);
        res.status(500).json({ success: false, message: "Failed to add testimonial." });
    }
};

exports.getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await Testimonial.find();
        res.json({ success: true, testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: "Could not fetch testimonials." });
    }
};

exports.deleteTestimonial = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTestimonial = await Testimonial.findByIdAndDelete(id);

        if (!deletedTestimonial) {
            return res.status(404).json({ success: false, message: "Testimonial not found." });
        }

        res.json({ success: true, message: "Testimonial deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting testimonial." });
    }
};

exports.getTestimonialsByCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!courseId) {
            return res.status(400).json({ success: false, message: "Course ID is required." });
        }

        const testimonials = await Testimonial.find({ courseId });
        res.json({ success: true, testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error fetching testimonials." });
    }
};