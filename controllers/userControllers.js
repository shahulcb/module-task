const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/jwtToken")
const User = require("../models/userModel")
const userModel = require("../models/userModel")


exports.registerUser = async (req, res) => {
    const { fullname, email, password } = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ fullname, email, password: hashPassword })
        res.status(200).json({
            success: true,
            message: "User register successfully",
            isAuthenticated: true,
            user: newUser
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            isAuthenticated: false
        })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                isAuthenticated: false
            })
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
            return res.status(404).json({
                success: false,
                message: "User not found",
                isAuthenticated: false
            })
        }
        req.user = user
        generateToken(req, res)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            isAuthenticated: false
        })
    }
}

exports.getAllUsers = async (req, res) => {
    const users = await userModel.find()
    res.status(200).json({
        success: true,
        data: users
    })
}