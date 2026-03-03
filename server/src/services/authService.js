const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const register = async (signUpForm) => {
    if (!signUpForm || !signUpForm.name || !signUpForm.mail || !signUpForm.password) {
        const error = new Error("Required all fields for registering user");
        error.statusCode = 400;
        throw error;
    }

    const existingUser = await User.findOne({ userMail: signUpForm.mail });

    if (existingUser) {
        const error = new Error("Mail already exists");
        error.statusCode = 409;
        throw error;
    }

    const hashedPassword = await bcrypt.hash(signUpForm.password, 10);

    const newUser = await User.create({
        userName: signUpForm.name,
        userMail: signUpForm.mail,
        password: hashedPassword
    });

    return {
        message: "User created successfully",
        user: {
            id: newUser._id,
            userName: newUser.userName,
            userMail: newUser.userMail
        }
    };
};

const login = async (loginForm) => {
    if (!loginForm || !loginForm.mail || !loginForm.password) {
        const error = new Error("Required all fields for login");
        error.statusCode = 400;
        throw error;
    }

    const existingUser = await User.findOne({ userMail: loginForm.mail });

    if (!existingUser) {
        const error = new Error("User mail not exists");
        error.statusCode = 401;
        throw error;
    }

    const isMatch = await bcrypt.compare(loginForm.password, existingUser.password);

    if (!isMatch) {
        const error = new Error("Incorrect password entered");
        error.statusCode = 401;
        throw error;
    }

    const token = jwt.sign(
        {
            user: {
                id: existingUser._id,
                userName: existingUser.userName,
                userMail: existingUser.userMail
            }
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
    );

    return {
        message: "Login success",
        token,
        user: {
            id: existingUser._id,
            userName: existingUser.userName,
            userMail: existingUser.userMail
        }
    };
};

module.exports = { register, login };