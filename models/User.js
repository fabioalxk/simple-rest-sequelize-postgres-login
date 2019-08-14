const sequelize = require("../config/database");
const { Sequelize } = require("sequelize");

const User = sequelize.define("user", {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

module.exports = User;
