const express = require("express")
const router = express.Router()


const {
    registerUser,
    loginUser,
    getMe,
    deleteUser,
    getSingleUser
}
    = require("../controller/userController")

const { authGuard, adminGuard } = require("../middleware/authMiddleware")
router.route("/").post(registerUser)
router.route("/me").get(authGuard, getMe)
router.route("/:id")
    .get(authGuard, adminGuard, getSingleUser)
    .delete(authGuard, adminGuard, deleteUser)
router.route("/login").post(loginUser)

module.exports = router