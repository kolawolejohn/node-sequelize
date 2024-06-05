require('dotenv').config()

const express = require('express')
const loginRoute = require('./routes/login.route')
const userRoute = require('./routes/user.route')
const port = process.env.PORT

const {sequelize} =  require('./database/db')
const authentication = require('./middlewares/authentication.middlewre')
const app = express()
app.use(authentication)

app.use(express.json())
app.use('/users', userRoute)
app.use('/login', loginRoute)
app.use("/public", express.static("public"))

app.listen(port, async () => {
    try {
        console.log(`app running on port: ${port}`)
    } catch (error) {
        console.log('error', error)
    }
})