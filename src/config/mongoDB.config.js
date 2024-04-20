const mongoose = require("mongoose");
const serverConfig = require("./server.config");

async function connectDB() {
    try {
        await mongoose.connect(serverConfig.MONGO_URL);
    } catch (error) {
        throw error;
    }
}

module.exports = connectDB;
