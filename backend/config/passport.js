const passport = require('passport')
const LocalStrategy  = require('passport-local')
const mongoose = require('mongoose')
const UserModel = require('../models/User')


passport.use(new LocalStrategy(
  {
    usernameField:"email", 
    passwordField:"password"
  },
async (email, password, done)=> {
  const user = await UserModel.findOne({email:email, password:password})
  if (!user) {
    return done(null, false)
  }
    return done(null, user)
}))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  console.log(id)
  UserModel.findById(id, (err, user)=>{
    done(err, user);
  });
})
module.exports = passport