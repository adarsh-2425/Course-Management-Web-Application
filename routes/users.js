const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");

require('dotenv').config();




// Create User
router.post('/create',(req,res,next)=>{
    let newUser = new User ({
        //Whatever submitted in the form, we can get with req.body
        //passing objects
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        role: req.body.role,
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

    // Nodemailer stackoverflow
    // https://stackoverflow.com/questions/71573382/what-type-of-email-should-i-use-for-nodemailer-to-not-get-blocked#:~:text=I%20used%20Zoho%20mail%20and,var%20transport%20%3D%20nodemailer.

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
    from: '"Learn Academy" <adarsh.lol2425@zohomail.in>', // sender address
    to: newUser.email, // list of receivers
    subject: "Account Created", // Subject line
    text: "Account Created. Welcome to Learn Academy.", // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  });
  
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
//{_id: {$ne: "636669c764d20587be67c3b4"}}
//Read All Users
router.get('/read',(req,res)=>{
    User.find()
    .then((users)=>{
        res.send(users)
    });
});

//Update User
router.put('/update', (req,res)=>{
    id=req.body._id,
    firstName= req.body.firstName,
    lastName=req.body.lastName,
    gender= req.body.gender,
    role = req.body.role,
    email= req.body.email,
    about= req.body.about,
    phone=req.body.phone,
    username= req.body.username,
    password=req.body.password,

    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, (err, hash)=>{
            if(err) throw err;
            Password = hash;
        
    

    User.findByIdAndUpdate({"_id":id},
                            {$set:{
                                "firstName": firstName,
                                "lastName": lastName,
                                'gender': gender,
                                'email': email,
                                'about':about,
                                'role':role,
                                'phone': phone,
                                'username': username,
                                'password': Password
                            }})
            .then(function(){
            //res.send()
            res.json({success: true, msg: 'User Updated'})
        })
    })
    })
    });

//Delete User
router.delete('/delete/:id',()=>{
    id = req.params.id;
    User.findByIdAndDelete({"_id":id})
    .then(()=>{
        res.send();
    })
});



module.exports = router;