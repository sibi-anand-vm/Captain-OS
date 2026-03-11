const express=require("express");
const {registerUser,loginUser,getUsers} = require("../controllers/authController");
const validateToken = require("../middleware/validateToken");
const router=express.Router();


router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/validate").get(validateToken, (req, res) => res.json({valid: true}));
module.exports=router; 