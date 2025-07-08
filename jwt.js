require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtAuthMiddleware= (req,res,next)=>{
    const authorization =req.headers.authorization
if(!authorization)return res.status(401).json({err:"token is not found"})

    const token = req.headers.authorization.split(' ')[1]
    if(!token)return res.status(401).json({error:'unauthorize'})
        //if we find token//
    try{
        //To verify tokens//
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        //Attach token to user information in an object//
        req.user = decoded
        next()
    }catch(err){
        console.log(err)
        res.status(500).json({error:'invalid token'})
    }
}
// function to generate jwtTokens//
const generateToken= (userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET)
   

}
module.exports ={jwtAuthMiddleware,generateToken}