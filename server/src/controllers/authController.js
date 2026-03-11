const asyncHandler = require("express-async-handler");
const authService = require("../services/authService");
const User = require("../models/User");
const logger = require("../utils/logger");

// Register
const registerUser = asyncHandler(async (req, res) => {
    const result = await authService.register(req.body.signUpForm);
    logger.info({
      message: "New user registered",
      userId: result.user._id
    });
    res.status(201).json(result);
});

// Login
const loginUser = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body.loginForm);
    logger.info({
      message: "User logged in",
      userId: result.user._id
    });
    res.status(200).json(result);
});


module.exports = { registerUser, loginUser };