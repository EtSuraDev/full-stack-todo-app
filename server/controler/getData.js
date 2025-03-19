const data = require("../model/data.model.js")
const userModel = require("../model/user.model.js")

const getData = async(req, res) => {
    try {
        const userId = req.userId
        const user = await userModel.findById({ _id: userId })
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found", data: [] })
        }
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
        return res.status(500).json({ success: false, message: "something wrong", data: [] })
    }
}


module.exports = {
    getData
}