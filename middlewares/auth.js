const jwt = require("jsonwebtoken")

exports.verifyToken = (req, res, next) => {
    const { token } = req.cookies
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
        if (error) {
            return res.status(401).json({
                success: false,
                message: "invalid token",
                isAuthenticated: false
            })
        }
        next()
    })
}