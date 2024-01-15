const bcrypt = require("bcryptjs")
const { generateToken } = require("../utils/jwtToken")

const users = [
    {
        _id: 1,
        fullName: 'test1',
        email: 'test1@gmail.com',
        password: '$2b$10$aUCF9VSgIccIzefhKqCVD.TYtEbCFBYGwUXRfzqdRQnGGCPUcxD6W'
    },
    {
        _id: 2,
        fullName: 'test2',
        email: 'test2@gmail.com',
        password: '$2b$10$tDKxGGl4RUofq3Jwp1OVXOxnbfcgCvwJpI2FClTDSUz26/nt6xEfK'
    }
]

exports.registerUser = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = {
            fullName,
            email,
            password: hashPassword
        }
        res.status(200).json({
            success: true,
            message: "User register successfully",
            isAuthenticated: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error registering user",
            isAuthenticated: false
        })
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = users.find((u) => u.email === email)
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
            message: "Error Login user",
            isAuthenticated: false
        })
    }
}

exports.getAllUsers = (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    })
}