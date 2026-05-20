const mongoose = require('mongoose');

// Job data structure
const JobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String },
    description: { type: String, required: true },
    location: { type: String, required: true },
    salary: { type: mongoose.Schema.Types.Mixed },
    category: { type: String },
    postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Job', JobSchema);