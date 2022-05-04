const express = require('express')
const app = express()
const session = require('express-session')
const mongoose = require('mongoose')
const register = require('./controllers/register')
const passport = require('./config/passport')
const cors = require('cors')
async function conn(){
    await mongoose.connect('mongodb://127.0.0.1:27017/express_login')
}
conn()
app.use(session({
    secret: 'ok', 
    resave: true, 
    saveUninitialized: false 
  }))
  
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use("/", register)

app.listen(4000)



