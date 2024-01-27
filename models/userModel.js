const mongoose = require("mongoose")
const validator = require("validator")

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        minLength: [4, "min length error"],
        maxLength: [20, "max length error"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, "email error"]
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", userSchema)