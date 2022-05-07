const express = require('express')
var router = express.Router()
const UserModel = require('../models/User')
const { body, validationResult } = require('express-validator');
const passport = require('../config/passport')
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const fs = require("fs");
const path = require("path");



const  checkIfExist = async (req, res, next)=>{
    const result = await UserModel.find({email:req.body.email})
    if(result.length){
       res.status(409).json('ca existe deja') 
    }else{
        next()
    }
}
router.post('/register', 
        body('password')
        .isLength({min:8})
        .custom((value, {req}) =>{
            if(value == req.body.confirmpassword){
                return true;        
            }
        }),
        checkIfExist, 
        (req, res, next)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
              return res.status(400).json({ errors: errors.array() });
            }
            var newUser = req.body
            newUser.profilePicture = 'http://localhost:4000/uploads/ok.png'

            const user = new UserModel(newUser)
            user.save()
            res.json(req.body)
})


router.post('/auth/login', 
passport.authenticate('local'),
(req, res) => {
  if (req.user) {
    req.logIn(req.user, (err) => {
        res.status(200).json(req.user)
      })
    }else{
      res.json("eh no")
    }
})



function loggedIn(req, res, next) {
  if (req.user) {
    console.log(`User: found.`)
    return next();
  } else {
    console.log('No user object.')
    res.status(401).send('no user object')
  }
}
router.get('/admin',loggedIn, async (req, res, next)=>{
  const users = await UserModel.find()
  res.json(users)
})
router.post('/upload',
          loggedIn,
          upload.single('file'),
          (req, res)=>{
            const newPathFile = path.join(req.file.destination, req.file.originalname)
            fs.renameSync(req.file.path, newPathFile)
            UserModel.findOneAndUpdate({_id:req.user._id}, {profilePicture:newPathFile}).then(update=>{
              res.json(update)
            })
})

router.post('/logout', function(req, res){
  req.logout();
  res.json('disconnected')
});


module.exports = router