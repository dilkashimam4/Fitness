const mongoose = require("mongoose")

const URI = process.env.MONGO_URI || "mongodb://localhost:27017/fitness"
async function connection() {
    try {
        await mongoose.connect(URI)
        console.log("db is connect")
    } catch (err) {
        console.log("db is not connect")
    }
}

connection()