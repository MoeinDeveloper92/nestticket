const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")

const authGuard = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        try {
            //Get Token from head
            token = req.headers.authorization.split(" ").pop()
            //Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password")

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("Unauthorized User!")
        }
    }
    if (!token) {
        res.status(401)
        throw new Error("Unauthorized User!")
    }
})


const adminGuard = asyncHandler(async (req, res, next) => {
    const role = req.user.role
    if (role === "admin") {

        next()
    } else {

        res.status(401)
        throw new Error("Only admin can have access to this route")
    }
})


module.exports = {
    authGuard,
    adminGuard
}