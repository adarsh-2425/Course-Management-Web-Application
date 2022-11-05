const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./database');

//Authentication using passport
module.exports = function (passport){
    //opts means options
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserById({_id: jwt_payload.data._id}, (err, user)=>{
        if(err){
            return done(err,false)
        }

        if(user){
            return done(null, user)
        }
        else{
            return done(null,false)
        }
    });
    }));
}

//line number 13
//https://magenaut.com/parameter-filter-to-find-must-be-an-object/