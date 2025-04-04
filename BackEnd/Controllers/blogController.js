

const Blog = require("../Models/blogModel");
const mongoose = require('mongoose');

exports.getAllBlogs = async (req, res) => {
    try {
        const Blogs = await Blog.find();
        res.json({ success: true, Blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Could not fetch Blogs' });
    }
}
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({ success: true, blog });
    } catch (error) {
        console.error('Error retrieving Blog:', error);
        res.status(500).json({ success: false, message: 'Error retrieving Blog' });
    }
}
exports.createBlog = async (req, res) => {
    try {

        const imageUrl = req.file.path;
        console.log(req.file);
        const { author, title, date, content, duration } = req.body;

        if (!author || !title || !date || !content || !duration || !req.file) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required, including an image.'
            });
        }

        // Get the image URL

        const newBlog = new Blog({
            author,
            image: imageUrl,
            title,
            date,
            content,
            duration
        });

        await newBlog.save();

        res.status(201).json({
            success: true,
            message: 'Blog created successfully.',
            blog: newBlog
        });
    } catch (error) {
        console.error('Error creating Blog:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to create Blog. Please try again.'
        });
    }
};
exports.deleteBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found.' });
        }
        res.json({ success: true, message: 'Blog deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting Blog.' });
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const id = req.params.id;
        const { author, image, title, date, content, duration } = req.body;
        const newdata = { author, image, title, date, content, duration };
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid Blog ID format.' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(id, newdata, { new: true });
        if (!updatedBlog) {
            return res.status(404).json({ success: false, message: 'Blog not found.' });
        }
        res.json({ success: true, message: 'Blog updated successfully.', Blog: updatedBlog });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating Blog.' });
    }
}