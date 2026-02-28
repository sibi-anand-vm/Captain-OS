const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    userName:{
        type:String,
        required:[true,"This username field is required"]
    },
    userMail:{
        type:String,
        required:[true,"This usermail field is required"]
    },
    password:{
        type:String,
        required:[true,"This password field is required"]
    },
},{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema); 