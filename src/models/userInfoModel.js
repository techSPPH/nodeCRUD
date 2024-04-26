// src/models/userInfoModel.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const UserInfo = sequelize.define('userinfo', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return UserInfo;
};
