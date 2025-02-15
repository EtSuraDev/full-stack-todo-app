const mongoose = require("mongoose")


const schema = mongoose.Schema({
    data: { type: Array },
    userId: { type: String, required: true }
})


const data = mongoose.model("data", schema)


module.exports = data