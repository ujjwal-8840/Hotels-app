const lodash = require('lodash')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const personSchema =new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    work:{
        type:String,
        enum:['chef','waiter','owner','receptionist']
    },
    mobile:{
        type:Number,
        require:true
    },
    email:{
    type:String,
    require:true,
     unique :true
    },
    addrress:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    },
    username:{
     require :true,
     type :String
    },
    password:{
        require:true,
        type:String
    },
});
personSchema.pre('save',async function (next){
    const person  = this;
    //Hash the password is modified our pasword or a new perosn login//
      if(!person.isModified('password')) return next()
    try{
     // Hash password is generated
    const salt = await bcrypt.genSalt(10);
    // Hash password//
    const hashPassword = await bcrypt.hash(person.password ,salt)
    person.password = hashPassword
    next();
    }catch(err){
    next(err)
    }
})
// Function to use bcrypt to match  provided passowrd with hashed password//
personSchema.methods.comparePassword =async function(candidatePassword){
    try{
       const isMatch =  await bcrypt.compare(candidatePassword,this.password)
        return isMatch
    }catch(error){
    throw error
    }
}
// Use the model//
const person =mongoose.model('person',personSchema)
module.exports = person


