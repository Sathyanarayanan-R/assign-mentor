const mongoose = require('mongoose');

const MentorSchema = mongoose.Schema({
    name: {type: String, required: true},
    stream: {type: String, required: true},
    availability: {type: String, required: true}
});

const Mentor = mongoose.model('Mentor', MentorSchema, 'mentor');

module.exports = Mentor;