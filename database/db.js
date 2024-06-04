// const {Sequelize} = require('sequelize')

// const sequelize = new Sequelize(process.env.DB_CONNECTION)

// module.exports = {sequelize}

const { Sequelize } = require('sequelize');
const createUserModel = require('../models/user.model');
const config = require('../config/config').development

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const UserModel = createUserModel(sequelize)

module.exports = {
    sequelize,
    UserModel
}