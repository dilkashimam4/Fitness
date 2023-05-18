const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 5000
const loginRouter = require("./routers/login")
const passport = require("passport")
const { default: mongoose } = require("mongoose")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const fs = require("fs")
const utl = require("util")
require("./db/connection.db")
app.use(cors({
    origin: [process.env.UI_URL],
    credentials: true,
    methods: ["PUT", "POST", "DELETE", "GET"],
    // allowedHeaders: ['Content-Type', "Access-Control-Allow-Origin"]
}))
app.use(cookieParser(process.env.session_secret))
app.use(session({
    secret: process.env.session_secret,
    resave: true,
    name: "ss",
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        dbName: 'passport-session',
        collectionName: "sessions"
    }),
    cookie: {
        httpOnly: true,
        secure: "auto"
    }
}))
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ limit: "200mb",extended:true }))
app.use(passport.initialize())
app.use(passport.session())
require("./strategy/google")(passport)
app.use("/login/api", loginRouter)

console.log = function (d) {
    fs.createWriteStream(__dirname + "/log.log", { flags: "a" }).write(utl.format(d) + "\n")
    process.stdout.write(utl.format(d) + "\n")
}
mongoose.connection.once("open", () => {
    app.listen(port, (err) => {
        if (err) {
            console.log("server is not start" + err)
        }
        else {
            console.log(`server is running at port-${port}`)
        }
    })
})