const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const cors = require("cors")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(cors({ credentials: true, origin: true }))


module.exports = app