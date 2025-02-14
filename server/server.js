const express = require("express")
require("dotenv").config()
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const authRoute = require("./route/authRouter.js")
const connectDB = require("./DB/connect.js")


const app = express()
const PORT = process.env.PORT || 8080
const DB_URL = process.env.DB_URL
const LOCALHOST = process.env.LOCALHOST || "http://localhost:3000"



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser());



app.use("/api/auth", authRoute)



app.use("*", (req, res) => {
    res.status(404).json({ success: false, message: "NOT FOUND" })
})


connectDB(DB_URL)

app.listen(PORT, () => console.log(`server listening on PORT:${PORT}`))