const express = require('express');
const router = express.Router();
const Course = require('../models/course')



// Create New Course
router.post('/create',(req,res)=>{
    let newCourse = new Course({
        Name: req.body.Name,
        Duration: req.body.duration,
        Fee: req.body.fee
    });
    Course.addCourse(newCourse, (err, course)=>{
        if(err){
            res.json({success: false, msg:'Failed to Add Course'})
        }
        else{
            res.json({success: true, msg: 'Course Added'})
        }
    })
});

//Read All Courses
router.get('/read',(req,res)=>{
    Course.find()
    .then((courses)=>{
        res.send(courses)
    });
});

//Update Courses
router.put('/update', (req,res)=>{
    id=req.body._id,
    courseName= req.body.courseName,
    Duration=req.body.duration,
    Fee= req.body.fee,

    Course.findByIdAndUpdate({"_id":id},
                            {$set:{
                                "courseName": courseName,
                                "Duration": Duration,
                                'Fee': Fee
                            }})
            .then(function(){
            res.send();
        })
    });

//Delete Course
router.delete('/delete/:id',()=>{
    id = req.params.id;
    User.findByIdAndDelete({"_id":id})
    .then(()=>{
        res.send();
    })
});



module.exports = router;