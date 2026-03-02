const asyncHandler = require("express-async-handler");
const authService = require("../services/authService");
const User = require("../models/User");

// Register
const registerUser = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body.signUpForm);
    res.status(201).json(result);
});

// Login
const loginUser = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body.loginForm);
    res.status(200).json(result);
});


module.exports = { registerUser, loginUser };