const passport = require('passport')
const Person = require('./models/person') 
const LocalStrategy = require('passport-local').Strategy  // Other name of localsatrtegy is username and password strategy//

passport.use(new LocalStrategy(async (username,password,done)=>{
  //Authentication logic is here//
  try{
  /* console.log('cofidential info',username,password)*/
  const user  = await Person.findOne({username:username})
  if(!user)
   return done(null,false,{message:'incorrect username'})
const isMatchedpassword = await user.comparePassword(password)
if(isMatchedpassword){
   return done(null,user);
}else{
   return done(null,false,{mesage:'incorrect password'})
}
  }catch(error){
   return done(error)
  }
}));
 module.exports = passport