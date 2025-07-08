const express = require('express')
const router = express.Router()
 const Person = require('../models/person');
const {jwtAuthMiddleware,generateToken} = require('./../jwt');
const person = require('../models/person');
//const jwt = require('../jwt'); // 👈 adjust this path as per your real structure
 // adjust path if needed


 router.post('/signup',async(req,res)=>{
  try{
   const data= req.body
   const newPerson = new Person (data);
   const response = await newPerson.save()
   console.log(response)
   const payload = {
    id:response.id,
    username:response.username,
    email:response.email
   }
   console.log(JSON.stringify(payload))
   const token =  generateToken(payload)
   console.log('token is',token)
   res.status(200).json({response:response,token:token})
  }catch(error){
console.log("error caught:",error)
res.status(500).json({message:'500 is responding'})
  }
 });
 //Login routes
router.post('/login',async (req,res)=>{
  try{ 
    //Extract username and password//
    const {username,password} = req.body
     //to find and verify username and password//
     const user = await Person.findOne({username:username})
     //If user does not exist does not matched to get error

     if(!user||(await !user.comparePassword(password)))
      return res.status(401).json({err:"invalid username and password"})
    // To generate token//
const payload = {
  id:user.id,
  username:user.username
}

    const token = generateToken(payload)
    res.status(200).json({token})

  }catch(err){
    console.log(err)
    res.status(500).json({message:'internal server error'})

  }
})

 router.get('/',jwtAuthMiddleware,async (req,res)=>{
 try{
 const response = await Person.find()
 console.log(response)
 res.status(200).json(response)
 }catch(error){
 console.log('error find',error)
 }
  });
  router.get('/profile',async (req,res)=>{
    try{
    const userData = req.user
    console.log(userData)
    const userId = userData.id
    const user = await Person.findById(userId)
    console.log(user)
    res.status(200).json({message :'profile fetch',user:user})
    }catch(err){
    console.log(err)
    res.status(500).json({message:'internal server error'})
    }
  })
  router.get('/:workType',async (req,res)=>{
    try{
    const workType =req.params.workType;
      console.log(workType)
    if(workType==='chef'||workType==='owner'||workType==='waiter'||workType ==='receptionist'){
      const response = await Person.find({work:workType})
      console.log('data fetched',response) 

    
       res.status(200).json(response)
    }else{
      console.log("data not available")
      
      res.status(400).send('invalid worktype')
      
    }
    }catch(error){
      console.log('internal server is not responding',error)
      res.status(500).send('internal server error')
  
    }
   });
   router.put('/:id',async (req,res)=>{
    try{
    const updatePerson = req.params.id
    const updatePersonData = req.body
    const response = await Person.findByIdAndUpdate(updatePerson,updatePersonData,{
      new :true,
      runValidators:true
    })
    console.log('data fetched',response)
     if (!response) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.status(200).json(response)
    }catch(error){
     console.log( 'internal server hacked',error)
     res.status(500).send('ineternal server is collapsed')
    }
   });
   router.delete('/:id',async (req,res)=>{
    try{
    const deletePerson = req.params.id
    
    const response = await Person.findByIdAndDelete(deletePerson)
     if (!response) {
      return res.status(404).json({ message: "Person not found" });
    }
    console.log('data deleted',response)
    res.status(200).json({message:'data delted succesfully',data:response})
    }catch(error){
   console.log('data is not deletd',error)
   res.status(500).json("data not deleted")
    }
   })
   module.exports= router