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

//Authenticate
router.post('/authenticate',(req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user)=>{
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg:'Wrong Email'})
        }

        User.comparePassword(password, user.password, (err, isMatch)=>{
            if (err) throw err;
            if(isMatch){
               const token = jwt.sign({data:user}, config.secret, {
                expiresIn: 604800 //week
               });

               res.json({
                success: true,
                token:`Bearer ${token}`,
                user:{
                        id: user._id,
                        name: user.firstName + " " + user.lastName,
                        username: user.username,
                        email: user.email,
                        role: user.role,
                }
               });
            }
            else{
                return res.json({success: false, msg: 'Wrong Password'});
                }
        })
    })
})

module.exports = router;