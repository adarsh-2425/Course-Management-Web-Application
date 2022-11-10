const express = require('express');
const router = express.Router();
const Assessment = require('../models/assessment');
const dotenv = require('dotenv').config();
const nodemailer = require("nodemailer");

// Read Each Assignment
router.get(`/geteach/:id`, (req,res)=>{
    const id = req.params.id;
    Assessment.findOne({"_id":id})
    .then((assessment)=>{
        res.send(assessment);
    })
});

//Read Assignments by Username
router.get('/geteachbyusername/:username', (req,res)=>{
    const username = req.params.username;
    Assessment.find({"Username":username})
    .then((assessment)=>{
        res.send(assessment);
    })
})

// Create New Assignment
router.post('/create',(req,res)=>{
    let newAssessment = new Assessment({
        Username: req.body.username,
        Link: req.body.link,
        LastDate: req.body.lastDate,
        studentEmail: req.body.studentEmail,
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

//Read All Assignments
router.get('/read',(req,res)=>{
    Assessment.find()
    .then((assessments)=>{
        res.send(assessments)
    });
});



//Update Assignment
router.put('/update', (req,res)=>{
        id = req.body._id,
        Username = req.body.username,
        studentEmail = req.body.studentEmail,
        Link = req.body.link,
        SubmittedDate = req.body.submittedDate,
        CourseName = req.body.courseName,
        Module = req.body.module,
        Mark = req.body.mark,
        AssessedBy = req.body.AssessedBy,
        Feedback = req.body.feedback

        
        Assessment.findByIdAndUpdate({"_id":id},
                            {$set:{
                                "Username" : Username,
                                "Link" : Link,
                                "SubmittedDate" : SubmittedDate,
                                "CourseName" : CourseName,
                                "Module" : Module,
                                "Mark" : Mark,
                                "AssessedBy" : AssessedBy,
                                "Feedback" : Feedback
                            }})
            .then(function(){
            res.send()
               // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.in", //mail.google.com
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.Email, // generated ethereal user
      pass: process.env.Password // generated ethereal password
    },
    tls:{
        rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Learn Academy" <process.env.Email>', // sender address
    to: studentEmail, // list of receivers
    subject: "Assignment Evaluated", // Subject line
    text: `Assignment of ${Module} Evaluated. Mark : ${Mark}. Evaluated By : ${AssessedBy}. Feedback : ${Feedback}`, // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
        })
    });

//Delete Assignment
router.delete('/delete/:id',()=>{
    id = req.params.id;
    Assessment.findByIdAndDelete({"_id":id})
    .then(()=>{
        res.send();
    })
});

module.exports = router;