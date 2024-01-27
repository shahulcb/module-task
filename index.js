const app = require("./app")
const dotenv = require("dotenv")
const userRoutes = require("./routes/userRoutes")
const connectDatabase = require("./config/db")

dotenv.config({ path: "./config/config.env" })
connectDatabase()

app.use("/api/user/", userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server running at port : ${process.env.PORT}`)
})