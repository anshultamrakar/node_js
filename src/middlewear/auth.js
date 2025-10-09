const jwt = require('jsonwebtoken');
const User = require("../models/users")

// const adminAuth = (req, res , next) => {
//    const token = "xyz"
//    const isAuthorised  = token === "xyz"
//    if(!isAuthorised){
//     res.status(401).send("admin not authorised")
//    }else{
//     next()
//    }
// }

// const userAuth = (req, res, next) => {
//     const token = "xyz"
//     const isAuthorised  = token === "xyz"
//     if(!isAuthorised){
//      res.status(401).send("admin not authorised")
//     }else{
//      next()
//     }
// }

const userAuth = async(req, res, next) => {
   try{
   const {token} = req.cookies
   if(!token){
    throw new Error("Token is not valid")
   }
   const decodedObj = await jwt.verify(token , "DevTinder@123#")
   const {_id} = decodedObj
   const user = await User.findById({_id})
   if(!user){
    throw new Error("User not found")
   }
   req.user = user
   next()
   }catch(err){
    res.status(400).send("ERROR" + err.message)
   }
}

module.exports = { userAuth}