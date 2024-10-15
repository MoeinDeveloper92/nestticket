const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name field is required!"]
    },
    email: {
        type: String,
        required: [true, "email field is required!"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password field is required!"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User