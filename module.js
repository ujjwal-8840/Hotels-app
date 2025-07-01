 const express = require('express')
 const app = express();
 let db = require('./db')
 const bodyParser = require('body-parser')
 app.use(bodyParser.json())
 

app.use (express.json())
app.get('/',(req,res)=>{
res.send("welcome to my server")
 });

 
 const personRouter = require('./routes/personRouter')
 const menuRouter = require('./routes/menuRouter')

  app.use('/person',personRouter)
  app.use('/menu',menuRouter)
 app.listen(9369,()=>{
    console.log('server is ready')
 })

