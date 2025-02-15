const data = require("../model/data.model.js")

const getData = async(req, res) => {
    try {
        const userId = req.userId
        const userData = await data.findOne({ userId })
        if (!userData) {
            return res.status(200).json({ success: true, message: "get all data", data: [] })
        }
        return res.status(200).json({
            success: true,
            message: " get all data ",
            data: {
                data: userData.data,
            }
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getData
}