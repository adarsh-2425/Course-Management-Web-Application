const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors =require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database')
var session = require('cookie-session');

// Connect to Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to Database');
});
// On Error
mongoose.connection.on('error',(err)=>{
    console.log('Database error:' +err);
});

const app = express();

// CORS Middleware
app.use(cors());

// bodyparser parses incoming request. eg: parsing content from form
app.use(bodyParser.json());

// Passport Middleware
// app.use(session({
//     secret: 'keyboard cat',
//     resave: true,
//     saveUninitialized: true,
//     cookie: { secure: true }
//   }))

// app.use(passport.initialize());
// app.use(passport.session());

//require('./configure/passport')(passport);

// Set Static Folder
app.use(express.static(`./public`));

// Index Route
app.get('/',(req,res)=>{
    console.log('server ok');
})

// Start Server
app.listen(3000, function(){
    console.log("server listening on port %d in %s mode", this.address().port, app.settings.env);
});