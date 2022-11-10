const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String
    },
    gender: {
        type: String
    },
    role: {
        type: String,
        default:'student'
    },
    Name: {
        type: String
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },
    image: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

// Below 2 created before routes/users
//using module.exports bcause we are using fns outside

//Calling By ID
module.exports.getUserById = (id,callback)=>{
    // Fn taking in id and callback
    User.findById(id, callback);
}

//Calling By Username
module.exports.getUserByUsername = (username,callback)=>{
    //creating a query
    const query = {username: username}
    User.findOne(query, callback);
}

//Calling By Username
module.exports.getUserByEmail = (email,callback)=>{
    //creating a query
    const query = {email: email}
    User.findOne(query, callback);
}

//Register User
module.exports.addUser = (newUser, callback)=>{
    //actual callback is in route
    //when this fn executes, result is passed to addUser fn in route as callback

    //hashing password
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, (err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}



// Comparing Passwords in Authenticatee
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if (err) throw err;
        callback(null, isMatch);
    });
}


