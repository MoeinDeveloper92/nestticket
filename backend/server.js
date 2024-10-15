const express = require("express")
const dotenv = require("dotenv").config({})
const { getUserIpAddress } = require("./utils/index")
const { errorHandler } = require("./middleware/errorMiddleware")
const colors = require("colors")
const connectDB = require("./config/db")
const PORT = process.env.PORT || 8000
const userIp = getUserIpAddress()

//initilize Applciaton
const app = express()
connectDB()

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to support Desk  API"
    })
})

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api/users", require("./routes/userRoutes"))
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`the App is running on the port ${PORT} and ${process.env.NODE_ENV} and the IP is ${userIp}`)
})