const express = require("express")
const route = express.Router()
const { signup, login, signout } = require("../controler/auth.js")


route.post("/signup", signup)
route.post("/login", login)
route.post("/signout", signout)



module.exports = route