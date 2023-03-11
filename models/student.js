const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {type: String, required: true},
    batch: {type: String, required: true},
    age: {type: Number, required: true},
    mentorid: {type: mongoose.Schema.Types.ObjectId, ref: 'MentorSchema'}
});

const Student = mongoose.model('Student', StudentSchema, 'student');

module.exports = Student;