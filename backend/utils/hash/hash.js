const bcrypt = require("bcryptjs")


async function encodePassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
}

async function comaprePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}


module.exports = {
    encodePassword,
    comaprePassword
}