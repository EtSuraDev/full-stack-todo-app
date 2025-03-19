const data = require("../model/data.model.js")
const user = require("../model/user.model.js")


const save = async(req, res) => {
    const userId = req.userId
    const resevedData = req.body.data
    if (!resevedData) {
        return res.status(400).send({ success: false, message: "provide all data" })
    }
    try {
        const userData = await data.findOne({ userId })
        userData.data.push(resevedData)
        await userData.save()



        res.status(201).json({ success: true, message: " Task Saved ", data: userData.data })
    } catch (error) {
        res.status(500).json({ success: false, message: " Try Agin " })
    }
}
const update = async(req, res) => {
    const userId = req.userId
    const resevedData = req.body.data
    const index = req.body.index

    if (!resevedData.task || !resevedData.status) {
        return res.status(400).json({ message: " provide all inputs ", success: false })
    }
    try {
        const userData = await data.findOne({ userId })
        userData.data[index] = resevedData
        await userData.save()
        res.status(200).json({ success: true, message: " updated ", data: userData.data })
    } catch (error) {
        return res.status(500).send({ success: false, message: "try agine" })
    }
}
const deleteTask = async(req, res) => {
    const userId = req.userId
    const { index } = req.body
    try {
        const userData = await data.findOne({ userId })
        userData.data.splice(index, 1)
        await userData.save()
        res.status(200).json({ success: true, message: " updated ", data: userData.data })
    } catch (error) {
        return res.status(500).send({ success: false, message: "try agine" })
    }
}

const deleteTasks = async(req, res) => {
    const userId = req.userId
    const { index } = req.body
    console.log(index)
    try {
        const userData = await data.findOne({ userId })
        userData.data = userData.data.filter((_, idx) => !index.includes(idx));
        await userData.save()
        res.status(200).json({ success: true, message: " updated ", data: userData.data })
    } catch (error) {
        return res.status(500).send({ success: false, message: "try agine" })
    }
}


module.exports = {
    save,
    update,
    deleteTask,
    deleteTasks
}