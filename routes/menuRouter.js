const express = require('express')
const router = express.Router()
 const Menu = require('../models/menu');

 
 router.post('/',async (req,res)=>{
try{
const daata = req.body
const newMenu = new Menu (daata);
const response = await newMenu.save()
console.log(response);
res.status(200).json(response)
}catch(err){
console.log('something went wrong',err)
}
 });
 router.get('/',async (req,res)=>{
  try{
  const response  = await Menu.find()
  console.log(response)
  res.status(200).json(response)
  }catch(error){
    console.log('error find',error)
  }
 });
 router.get('/:tasteType', async (req,res)=>{
    try{
    const tasteType = req.params.tasteType
    console.log(tasteType)
    if(tasteType === 'sour'|| tasteType==='little sweet'||tasteType=== 'tangy'||tasteType==='spicy'){
        const response = await Menu.find({taste:tasteType})
        console.log(response)
        res.status(200).json(response);

    }else{
        console.log('taste not available')
        res.status(400).send('invalid tastetype')
    }
    }catch(error){
        console.log('something went suspicioud',error)
        res.status(500).send('internal server is not responding')
    }
 });
router.put('/:id',async (req,res)=>{
    try{
    const updateTaste =req.params.id
    const updateIdTaste = req.body
    const response = await Menu.findByIdAndUpdate(updateTaste,updateIdTaste,{
        new:true,
        runValidation:true
    })
    console.log(response)
    if(!response){
        return res.status(400).json({message:'taste not found'})
    }
    res.status(200).json({message:'data fetched' ,response}) 
    }catch(error){
        console.log('data not fetched',error)
        res.status(500).send('internal server error')
    }
});
router.delete('/:id',async (req,res)=>{
    try{
   const deleteTaste =req.params.id
   const deleteIdTaste =req.body
   const response =await Menu.findByIdAndDelete(deleteTaste)
   console.log(response)
    if(!response){
        return res.status(400).json({message:'taste not found'})
    } 
   res.status(200).json({message:'data deleted successfully',response})
    }catch(error){
        console.log('data not be deleted',error)
        res.status(500).send('internal server error')
    }
})

 module.exports =router