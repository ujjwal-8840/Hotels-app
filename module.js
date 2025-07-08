 require('dotenv').config()
const express = require('express')
 const app = express();
 let db = require('./db')
 const {jwtAuthMiddleware,generateToken} = require('./jwt')
 const bodyParser = require('body-parser')
  
 app.use(bodyParser.json())
//  const Person = require('./models/person')
const passport = require('./auth')
app.use (express.json())
const logRequest = (req,res,next)=>{
   console.log(`${new Date().toLocaleString()} request to url: ${req.originalUrl}`);
   next()
}
app.use (logRequest)
app.use(passport.initialize())

const middleWare = passport.authenticate('local',{session:false});
app.get('/',(req,res)=>{
res.send("welcome to my server")
 });

 
 const personRouter = require('./routes/personRouter')
 const menuRouter = require('./routes/menuRouter');
const person = require('./models/person');

  app.use('/person',logRequest,jwtAuthMiddleware,personRouter)
  app.use('/menu',menuRouter)
  const PORT = process.env.PORT||9369
 app.listen(PORT,()=>{
    console.log('server is ready')
 })

