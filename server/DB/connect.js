const mongoose = require("mongoose")

const connect = async(DB_URL) => {
    try {
        await mongoose.connect(DB_URL)
        console.log("db connected")
    } catch (error) {
        console.log(`ERROR on connecting DATABASE \n ${error}`)
    }
}


module.exports = connect