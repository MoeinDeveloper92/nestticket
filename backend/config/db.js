const mongoose = require("mongoose");
const User = require("../models/userModel");
const { encodePassword } = require("../utils/hash/hash");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MONGODB CONNECTED: ${conn.connection.host}`.cyan.bgGreen.underline);
        await createAdminUser();

    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

const createAdminUser = async () => {
    try {
        const adminExist = await User.findOne({ role: "admin" });
        if (adminExist) {
            console.log("Admin user already exists.");
            return;
        }
        // all this sensitive ifnoramtion should be defined in the config file, it should not be exposed to code
        const admin = new User({
            name: "ADMIN",
            email: "admin@petanux.com",
            password: await encodePassword("ADMIN"), // Assuming encodePassword hashes the password
            role: "admin" // Add role if necessary in the schema
        });

        await admin.save();
        console.log("ADMIN Created on the first RUN");

    } catch (error) {
        console.error("Error creating admin user:", error);
    }
};

module.exports = connectDB;
