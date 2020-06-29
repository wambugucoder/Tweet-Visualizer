const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const TwitterStrategy = require("passport-twitter").Strategy;

    //SESSION AUTHENTICATION
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
  //GOOGLE AUTHENTICATION
  passport.use(new GoogleStrategy({
    clientID: keys.clientID,
    clientSecret: keys.clientSecret,
    callbackURL: "/auth/google/callback",
    proxy:true,
  },
  function(accessToken, refreshToken, profile, done) {
      console.log(profile);
    User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            photo: profile.photos[0].value.split("?")[0]
          })
            .save()
            .then(user => done(null, user));
        }
      });
  }
));
//TWITTER OAUTH AUTHENTICATION
passport.use(new TwitterStrategy({
    consumerKey: keys.consumer_key,
    consumerSecret: keys.consumer_secret,
    callbackURL: "http://localhost:5000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
  console.log(profile)
  User.findOne({ twitterId: profile.id }).then(existingUser => {
    if (existingUser) {
      done(null, existingUser);
    } else {
      new User({
        twitterId: profile.id,
        name: profile.displayName,
        photo: profile.photos[0].value,
       
      })
        .save()
        .then(user => done(null, user));
    }
  });

  }
));

