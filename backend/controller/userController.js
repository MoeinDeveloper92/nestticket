const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const { encodePassword, comaprePassword } = require("../utils/hash/hash")
const { generateToken } = require("../utils/jwt/jwtService")



//@desc      Register a yser
//@route     /api/users
//@access    Public Route
const registerUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body

    //Validation
    if (!email || !name || !password) {
        res.status(400)
        throw new Error("Please includes all fields!")
    }

    // Find if user exist in the DB
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error("User Already Exist!")
    }
    //Hash Password
    const hashed = await encodePassword(password)

    //create user
    const user = await User.create({
        name,
        email,
        password: hashed
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            email: user.email,
            name: user.name
        })
    } else {
        res.status(400)
        throw new Error("Invalid User Data")
    }
})

//@description       Login a user
//@route         /api/users/login
//@access        This is a public route
const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new Error("Please includes all the fields!")
    }
    //get the user
    const user = await User.findOne({ email })


    //check suer and password
    if (user && (await comaprePassword(password, user.password))) {

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials!")
    }
})

//desc      get current user
//route     /api/users/me
//access    private
const getMe = asyncHandler(async (req, res, next) => {
    const user = {
        id: req.user._ud,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role
    }
    res.status(200).json(user)
})


//desc      Delete a user
//
const deleteUser = asyncHandler(async (req, res, next) => {
    const userExist = await User.findById(req.params.id);

    if (!userExist) {
        return res.status(404).json({ message: "User Not Found!" });
    }

    await User.findByIdAndDelete(req.params.id);  // Use findByIdAndDelete for better readability

    res.status(200).json({
        message: `User with email ${userExist.email} deleted!`,
    });
});

const getSingleUser = asyncHandler(async (req, res, next) => {
    res.status(200).json({
        message: "Alles gut"
    })
})

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    getMe,
    getSingleUser
}