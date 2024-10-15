const os = require("os")

function getUserIpAddress() {
    const ipAddress = os.networkInterfaces()
    for (const item of Object.values(ipAddress)) {
        for (const ip of Object.values(item)) {
            if (!ip.internal && ip.family === "IPv4") {
                if (ip.address.split(".").pop() === "100") {
                    return ip.address
                }
            }
        }
    }
}


module.exports = { getUserIpAddress } 