const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../models/user.model");
require("dotenv").config();

passport.use(
  new GoogleStrategy({
    //
    callbackUrl: "/auth/google/redirect",
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
  }),
  (accessToken, refreshToken, profile, done) => {
    //passport callback
    console.log(profile);
    //Checl if user already exist before we proceed to create account

    User.findOne({googleId:profile.id}).then((currentUser)=>{
        if(currentUser){
            //already have the user
            console.log("User is "+ currentUser)
        } else{
            new User({
                //Add other details of the user there
                googleId: profile.id,
              })
                .save()
                .then((newUser) => {
                  console.log("New user created" + newUser);
                });
        }
    })
    
  }
);
