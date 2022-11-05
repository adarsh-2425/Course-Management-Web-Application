const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


// REGISTER
router.post('/register',(req,res,next)=>{
    let newUser = new User ({
        //Whatever submitted in the form, we can get with req.body
        //passing objects
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        //password will be run through bcrypt
        //bcrypt hash password before going to DB
        password: req.body.password
    });

    //created new function called addUser
    // newUser object and a callback(err,user) is passed
    User.addUser(newUser, (err,user)=>{
        //if the response from addUser is error
        if(err){
            res.json({success: false, msg:'Failed to register user'})
        }
        else{
            res.json({success: true, msg:'User Registered'})
        }
    })
});

module.exports = router;