const app = require("./app")
const dotenv = require("dotenv")
const userRoutes = require("./routes/userRoutes")

dotenv.config({ path: "./config/config.env" })

app.use("/api/user/", userRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server running at port : ${process.env.PORT}`)
})