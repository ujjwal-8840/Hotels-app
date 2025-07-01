const express = require('express')
const router = express.Router()
 const Person = require('../models/person');

 router.post('/',async(req,res)=>{
  try{
   const data= req.body
   const newPerson = new Person (data);
   const response = await newPerson.save()
   console.log(response)
   res.status(200).json(response)
  }catch(error){
console.log("error caught:",error)
res.status(500).json(response)
  }
 });
 router.get('/',async (req,res)=>{
 try{
 const response = await Person.find()
 console.log(response)
 res.status(200).json(response)
 }catch(error){
 console.log('error find',error)
 res.status(500).send('internal error is find')
 }
  });
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