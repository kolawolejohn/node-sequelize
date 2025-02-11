const { DataTypes } = require("sequelize");
// const sequelize = require("../database/db");

const createUserModel = (sequelize) => {
    return sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
          is_admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        picture_url: {
            type: DataTypes.STRING,
            allowNull: true
          }
    })
}

module.exports = createUserModel