const express = require("express")
const route = express.Router()
const { getData } = require("../controler/getData.js")
const { auth } = require("../midellwar/auth.js")


route.get("/", auth, getData)




module.exports = route