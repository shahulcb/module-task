const express = require("express")
const { registerUser, loginUser, getAllUsers } = require("../controllers/userControllers")
const { verifyToken } = require("../middlewares/auth")
const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/all-users").get(verifyToken, getAllUsers)

module.exports = router