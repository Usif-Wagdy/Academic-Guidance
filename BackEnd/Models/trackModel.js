
const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, required: true },
});

module.exports = mongoose.model('track', trackSchema);