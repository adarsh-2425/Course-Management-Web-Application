const mongoose = require('mongoose');

// Assessment schema
const AssessmentSchema = mongoose.Schema({
    Username: {
        type: String
    },
    Link: {
        type: String
    },
    LastDate: {
    } ,
    Module: {
        type: Number
    },
    Mark: {
        type: Number
    },
    AssessedBy: {
        type: String
    },
    Feedback: {
        type: String
    }
});

const Assessment = module.exports = mongoose.model('Assessment', AssessmentSchema);

