const mongoose = require('mongoose');

// Assessment schema
const AssessmentSchema = mongoose.Schema({
    Username: {
        type: String
    },
    studentEmail: {
        type: String
    },
    Link: {
        type: String
    },
    LastDate: {
        type: String
    },
    SubmittedDate: {
        type: Date,
        default: Date.now
    },
    CourseName: {
        type: String
    },
    Module: {
        type: Number
    },
    Mark: {
        type: String
    },
    AssessedBy: {
        type: String
    },
    Feedback: {
        type: String
    }
});

const Assessment = module.exports = mongoose.model('Assessment', AssessmentSchema);

// Add Course
module.exports.addAssessment = (newAssessment, callback)=>{
    newAssessment.save(callback);
};