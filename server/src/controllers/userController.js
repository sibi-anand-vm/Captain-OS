const User=require("../models/User")
const asyncHandler=require("express-async-handler")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

// @desc Register User
// @route /api/users
// @access PUBLIC
const registerUser=asyncHandler(async(req,res)=>{
    const {signUpForm}=req.body;
    if(!signUpForm || !signUpForm.name || !signUpForm.mail || !signUpForm.password){
        res.status(400);
        throw new Error("Required All fields for registering user");
    }
    let existingUser=await User.findOne({userMail:signUpForm.mail});
    if(existingUser){
        res.status(409);
        throw new Error("Mail already exists");
    }
    let hashedPassword=await bcrypt.hash(signUpForm.password,10);
    const newUser=await User.create({
        userName:signUpForm.name,
        userMail:signUpForm.mail,
        password:hashedPassword
    })

    if(newUser){
        res.status(200).json({message:"User created successfully",newUser})
    }
    else{
        res.status(400);
        throw new Error("Cannot create User account");
    }
});


// @desc Login User
// @route /api/users/login
// @access PUBLIC
const loginUser=asyncHandler(async(req,res)=>{
    const {loginForm}=req.body;
    if(!loginForm || !loginForm.mail || !loginForm.password){
        res.status(400);
        throw new Error("Required All fields for registering user");
    }
    let existingUser=await User.findOne({userMail:loginForm.mail});
    if(!existingUser){
        res.status(401);
        throw new Error("Usermail not exists");
    }
    
    if(await bcrypt.compare(loginForm.password,existingUser.password)){
        let token=jwt.sign({user:{
            id:existingUser._id,
            userName:existingUser.userName,
            userMail:existingUser.userMail
        }},process.env.JWT_SECRET,{"expiresIn":"2d"});
        const user={ id:existingUser._id, userName:existingUser.userName, userMail:existingUser.userMail };
        res.status(201).json({message:"Login success",token,user});
    }
    else{
        res.status(401);
        throw new Error("Incorrect password entered");
    }
});


// @desc Get User
// @route /api/users/
// @access PRIVATE
const getUsers=asyncHandler(async(req,res)=>{
    const users=await User.find({}); 
    res.status(201).json({users});
});


module.exports={registerUser,loginUser,getUsers}; 