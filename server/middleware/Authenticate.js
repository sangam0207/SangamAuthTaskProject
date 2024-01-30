const jwt=require('jsonwebtoken');
const {userdb,secretKey}=require('../models/userSchema');
const authenticate=async(req,res,next)=>{
try {
    const token=req.headers.authorization;
   // console.log('token is ',token);
   const verifytoken=jwt.verify(token,secretKey);
   //console.log(secretKey)
   //console.log(verifytoken)
   const rootUser=await userdb.findOne({_id:verifytoken._id});
   //console.log(rootUser)
   if(!rootUser){
    throw new Error("user not Found")
   }
   req.token=token;
   req.rootUser=rootUser;
   req.userId=rootUser._id;
   console.log('hello')
   next();
} catch (error) {
    console.log(error)
}

}
module.exports={authenticate};