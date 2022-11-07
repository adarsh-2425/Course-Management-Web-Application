const express = require('express');
const router = express.Router();
const Assessment = require('../models/assessment');

// Create New Course
router.post('/create',(req,res)=>{
    let newAssessment = new Assessment({
        Username: req.body.username,
        Link: req.body.link,
        LastDate: req.body.lastDate,
        //SubmittedDate: req.body.submittedDate,
        CourseName: req.body.courseName,
        Module: req.body.module,
        Mark: req.body.mark,
        AssessedBy: req.body.AssessedBy,
        Feedback: req.body.feedback
    });
    Assessment.addAssessment(newAssessment, (err, assessment)=>{
        if(err){
            res.json({success: false, msg:'Cannot add Assessment at the Moment!'})
        }
        else{
            res.json({success: true, msg: 'Assessment Done'})
        }
    })
});

//Read All Courses
router.get('/read',(req,res)=>{
    Assessment.find()
    .then((assessments)=>{
        res.send(assessments)
    });
});

//Update Courses
router.put('/update', (req,res)=>{
        id = req.body._id,
        Username = req.body.username,
        Link = req.body.link,
        LastDate = req.body.lastDate,
        SubmittedDate = req.body.submittedDate,
        CourseName = req.body.courseName,
        Module = req.body.module,
        Mark = req.body.mark,
        AssessedBy = req.body.AssessedBy,
        Feedback = req.body.feedback

        Assessment.findByIdAndUpdate({"_id":id},
                            {$set:{
                                "Name": Name,
                                Username : Username,
                                Link : Link,
                                LastDate : lastDate,
                                SubmittedDate : submittedDate,
                                CourseName : courseName,
                                Module : Module,
                                Mark : Mark,
                                AssessedBy : AssessedBy,
                                Feedback : Feedback
                            }})
            .then(function(){
            res.send();
        })
    });

//Delete Course
router.delete('/delete/:id',()=>{
    id = req.params.id;
    Assessment.findByIdAndDelete({"_id":id})
    .then(()=>{
        res.send();
    })
});

module.exports = router;