const mongoose = require("mongoose")


const schema = mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    password: { type: String, required: true }, // Optional field
})


const user = mongoose.model("user", schema)


module.exports = user