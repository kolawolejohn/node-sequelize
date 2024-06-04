require('dotenv').config()

const express = require('express')
const loginRoute = require('./routes/login.route')
const userRoute = require('./routes/user.route')

const {sequelize} =  require('./database/db')
const authentication = require('./middlewares/authentication.middlewre')
const app = express()
app.use(authentication)

app.use(express.json())
app.use('/users', userRoute)
app.use('/login', loginRoute)

app.listen(3900, async () => {
    try {
      await sequelize.sync({force: false})
       console.log(`app running on port: 3900`)
  } catch (error) {
    console.log('error', error)
  }
})