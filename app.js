const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
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

const users = require('./routes/users');
const courses = require('./routes/courses');
const assessments = require('./routes/assessments');

// CORS Middleware
app.use(cors());




// bodyparser parses incoming request. eg: parsing content from form
app.use(bodyParser.json());

// Passport Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
  }));
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/courses', courses);
app.use('/api/assessments', assessments);

// Set Static Folder
app.use(express.static(`./public`));

// Index Route
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
    });


// Start Server
//dont use require env file on app.js. it affects process.env.port
app.listen(process.env.PORT || 3000, function(){
    console.log("server listening on port %d in %s mode", this.address().port, app.settings.env);
});