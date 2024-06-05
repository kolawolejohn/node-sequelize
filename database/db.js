require('dotenv').config()

const { Sequelize } = require("sequelize");
const createUserModel = require("../models/user.model");
const postgresUrl = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_DATABASE}`;
const sequelize = new Sequelize(postgresUrl, {
  dialect: 'postgres'
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const UserModel = createUserModel(sequelize);

module.exports = { sequelize, UserModel };