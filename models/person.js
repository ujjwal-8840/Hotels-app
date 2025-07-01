const lodash = require('lodash')
const mongoose = require('mongoose')
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
    }
})
const person =mongoose.model('person',personSchema)
module.exports = person


