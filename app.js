const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const userRoute = require('./routes/user.route')

const {sequelize} =  require('./database/db')
const app = express()

app.use(express.json())
app.use('/users', userRoute)

app.listen(3900, async () => {
    try {
      await sequelize.sync({force: false})
       console.log(`app running on port: 3900`)
  } catch (error) {
    console.log('error', error)
  }
})