const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');

passport.use(new LocalStrategy({
        usernameField: 'email'  
    },
    (username, passport, done) => {
        User.findOne({ email: username}, (err, user) => {
            if(err) {return done(err);}
            if(!user){
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassowrd(passport))
            {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }

));