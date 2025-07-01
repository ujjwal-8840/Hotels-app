const mongoose =require('mongoose');

const mongooseUrl = "mongodb://localhost:27017/family"

  mongoose.connect(mongooseUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection;
db.on('connected',()=>{
    console.log("connected to mongoDB server")
});
db.on('disconnected',()=>{
    console.log("mongoDB server is not connected")
});
db.on('error',(error)=>{
    console.log('error find:',error)
});
