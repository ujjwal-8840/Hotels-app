const lodash = require('lodash')
const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    dishName:{
        type:String,
        require:true,
        enum:['daal','mix veg','panner gravy']
    },
prices :{
    type:Number,
    require: true
},

taste:{
type:[String],
enum:['spicy','sour','little sweet','tangy']
},
is_Drink:{
    type:Boolean,
    default:false
,
num_sales:{
    type:Number,
    default:0
}}
});
const menu = mongoose.model('menu',menuSchema);
module.exports =menu
