const mongoose = require('mongoose')

const User = mongoose.Schema({
    email:String,
    password:String,
    firstname:String,
    surname:String,
    birthdate:Date,
    profilePicture:String
})
const UserModel = mongoose.model('user', User)

module.exports = UserModel