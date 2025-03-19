const express = require("express")
const route = express.Router()
const { save, deleteTask, update, deleteTasks } = require("../controler/CRUD.js")
const { auth } = require("../midellwar/auth.js")


route.patch("/save", auth, save)
route.patch("/update", auth, update)
route.delete("/delete", auth, deleteTask)
route.delete("/deleteAll", auth, deleteTasks)


module.exports = route