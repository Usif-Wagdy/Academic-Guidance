const mongoose = require('mongoose');
const internships = new mongoose.Schema({
    place: {
        type: String,
        required: true
    },
    company: {
        type: String,
    },

    sponser: {
        type: String,
        required: true
    }
    ,
    salary: {
        type: String
    },
    duration: {
        type: String,
        required: true
    },
    keywords: {
        type: [String],
        required: true
    },
    Image: {
        type: String,
    },

})
module.exports = mongoose.model('internships', internships)