const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

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
    email: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
    image: {
      type: DataTypes.BLOB, 
      allowNull: true, 
    },
  });

   // Hash password before saving
   UserInfo.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });

  return UserInfo;
};
