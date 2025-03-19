const model = require("../model/user.model.js")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY
const data = require("../model/data.model.js")




const signup = async(req, res) => {
    const { name, userName, password } = req.body
    try {
        if (!name || !userName || !password) {
            return res.status(400).json({ success: false, data: null, message: "pleas provide all in puts" })
        }
        const check = await model.findOne({ userName })
        if (check) {
            return res.status(400).json({ success: false, message: "the username exist", data: null })
        }
        const hidennPassword = await bcrypt.hash(password, 10)
        const user = await new model({
            name: name,
            userName: userName,
            password: hidennPassword
        })
        user.save()
        const userData = await new data({
            data: [],
            userId: user._id
        })
        userData.save()


        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true, // Prevents JavaScript from accessing the cookie
            maxAge: 3600000, // 1 hour
            sameSite: "None",
            secure: process.env.PRODUCTION, // Only enable for production
        });


        res.status(201).json({ success: true, message: "account successful creatd", data: { name: name, userName: userName } })

    } catch (error) {
        console.log(`ERROR ON user signup \n ${error}`)
        return res.status(500).json({ success: false, message: "some thing wrong" })
    }
}


const login = async(req, res) => {
    const { userName, password } = req.body
    try {
        const user = await model.findOne({ userName })

        if (!user) return res.status(404).json({ success: false, message: " incorrect user name ", data: null })
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) return res.status(400).json({ success: false, message: " incorrect password ", data: null })



        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true, // Prevents JavaScript from accessing the cookie
            maxAge: 3600000, // 1 hour
            sameSite: "None",
            secure: process.env.PRODUCTION, // Only enable for production

        });


        res.status(201).json({ success: true, message: "account successful creatd", data: { name: user.name, userName: userName } })
    } catch (error) {
        return res.status(500).json({ success: false, message: "some thing wrong" })
        console.log(`ERROR on login \n ${error}`)
    }
}



const signout = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true, // Ensure the cookie is protected
    });

    res.json({ message: "Logged out successfully!", success: true });
}


module.exports = {
    signup,
    login,
    signout
}