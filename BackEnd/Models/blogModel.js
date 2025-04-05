const mongoose = require("mongoose");

const blog = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    duration: {
        type: String,
    },
    content: {
        type: String,
    },
    instructorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
})


module.exports = mongoose.model('blog', blog)