const constants=require("../constants")
const errorHandler=(err,req,res,next)=>{
    let statusCode=res.statusCode || 500;
    switch(statusCode){
        case constants.constants.BAD_REQUEST:
            res.status(400).json({title:"Bad request",message:err.message,StackTree:err.stack});
            break;
        case constants.constants.UNAUTHORIZED:
            res.status(401).json({title:"Invalid Credentials",message:err.message,StackTree:err.stack});
            break;
        case constants.constants.FORBIDDEN:
            res.status(403).json({title:"User is not allowed to do the action",message:err.message,StackTree:err.stack});
            break;
        case constants.constants.NOT_FOUND:
            res.status(404).json({title:"Requested Resource not found",message:err.message,StackTree:err.stack});
            break;
        case constants.constants.CONFLICT:
            res.status(409).json({title:"Resource already exists",message:err.message,StackTree:err.stack});
            break;
        case constants.constants.INTERNAL_SERVER:
            res.status(500).json({title:"Internal server error",message:err.message,StackTree:err.stack});
            break;
        default:
            res.status(statusCode).json({title:"An unknown error",message:err.message,StackTree:err.stack});
    }
}

module.exports=errorHandler; 