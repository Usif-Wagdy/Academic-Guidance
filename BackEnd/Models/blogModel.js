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
    content: {
        type: String,
    },
    duration: {
        type: String,
    }
})


module.exports = mongoose.model('blog', blog)