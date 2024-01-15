const jwt = require("jsonwebtoken")

exports.generateToken = async (req, res) => {
    const userId = req.user._id
    const options = {
        id: userId,
        time: Date.now()
    }
    try {
        const token = await jwt.sign(options, process.env.JWT_SECRET, { expiresIn: "1min" })
        if (!token) {
            return res.status(500).json({
                success: false,
                message: "failed to genarate token",
                isAuthenticatd: false
            })
        }
        res.status(200).cookie("token", token).json({
            success: true,
            message: "User logined successfully",
            isAuthenticated: true,
            user: req.user,
            token
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to genarate token",
            isAuthenticatd: false
        })
    }
}