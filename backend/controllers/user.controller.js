const { default: mongoose } = require('mongoose');
const userModel = require('../models/user.model.js');
const { generateToken } = require('../utils/helper.js');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, profilepic } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const newUser = await userModel.create({
            name: name,
            email: email,
            password: password,
            role: role,
            profilepic: profilepic
        })
        res.status(201).json({
            user: newUser
        })
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password required"
            });
        }
        if (!user) {
            return res.status(400).json({
                message: "User not exists!"
            })
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user);
        res.status(200).json({
            message: "Login Successful!",
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        }

        )
    }
    catch (error) {
        res.status(500).json({
            message: error.message
        })
    }


}

const userProfile = async(req,res)=>{
    const user = req.user;
    res.status(200).json({
        user
    })
}

const logOutUser = async(req,res)=>{
    res.status(200).json({
        message:"Logout Successfully"
    })
}

module.exports = { registerUser, loginUser, userProfile,logOutUser }