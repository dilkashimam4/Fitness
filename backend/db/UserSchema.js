const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: String,
    lname: String,
    password: String,
    provider: String,
    email: String,
    image: String,
    verify: String
})

module.exports = new mongoose.model("users", schema)