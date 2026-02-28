const jwt=require("jsonwebtoken")
const User=require("../models/User")

const validateToken=async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decoded.user;
            next();
        }catch(err){
            res.status(401);
            throw new Error("User is not authorized");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("User is not authorized or token is missing");
    }
}

module.exports=validateToken; 