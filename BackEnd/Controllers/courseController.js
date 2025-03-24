const Course = require("../Models/CourseModel");

const validateCourse = (data) => {
    const errors = [];
    if (!data.name) errors.push("Course name is required.");
    if (!data.description) errors.push("Course description is required.");
    if (!data.duration) errors.push("Course duration is required.");
    if (!data.level) errors.push("Course level is required.");
    if (!["Beginner", "Intermediate", "Advanced"].includes(data.level)) {
        errors.push("Course level must be Beginner, Intermediate, or Advanced.");
    }
    if (!data.author) errors.push("Author name is required.");
    return errors;
};

exports.createCourse = async (req, res) => {
    try {
        const errors = validateCourse(req.body);
        if (errors.length > 0) {
            return res.status(400).json({ success: false, errors });
        }

        const newCourse = new Course(req.body);
        await newCourse.save();
        res.status(201).json({ success: true, message: "Course created successfully.", course: newCourse });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ success: false, message: "Failed to create course. Please try again." });
    }
};

exports.getAllCourses = async (req, res) => {
    console.log("📥 [GET] /courses called");

    try {
        const courses = await Course.find();
        res.json({ success: true, courses });
    } catch (error) {
        res.status(500).json({ success: false, message: "Could not fetch courses." });
    }
};

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({ success: false, message: "Course not found." });

        res.json({ success: true, course });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error retrieving course." });
    }
};


exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) return res.status(404).json({ success: false, message: "Course not found." });

        res.status(200).json({ success: true, message: "Course updated successfully.", course });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error updating course." });
    }
}


exports.deleteCourse = async (req, res) => {
    try {
        const id = req.params.id;
        const course = await Course.findByIdAndDelete(id);
        if (!course) return res.status(404).json({ success: false, message: "Course not found." });

        res.json({ success: true, message: "Course deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting course." });
    }
}