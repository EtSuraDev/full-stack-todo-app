const jwt = require("jsonwebtoken")


const auth = async(req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(400).json({ success: false, message: " plesa login or signup " })
    }
    try {
        const userId = await jwt.verify(token, process.env.SECRET_KEY)
        req.userId = userId.userId
        next()
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    auth
}