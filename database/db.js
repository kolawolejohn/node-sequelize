require('dotenv').config()

const { Sequelize } = require('sequelize');
const createUserModel = require('../models/user.model');


const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
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