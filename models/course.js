const mongoose = require('mongoose');
const config = require('../config/database')

//Course Schema
const CourseSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Duration: {
        type: String,
        required: true
    },
    Fee: {
        type: Number,
        reqired: true
    }
});

const Course = module.exports = mongoose.model('Course', CourseSchema);

//Calling By Course Name
module.exports.getCourseByName = (course,callback)=>{
    //creating a query
    const query = {Course: course}
    Course.findOne(query, callback);
};

// Add Course
module.exports.addCourse = (newCourse, callback)=>{
    newCourse.save(callback);
};