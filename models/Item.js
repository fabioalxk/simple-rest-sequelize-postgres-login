const sequelize = require("../config/database");
const { Sequelize } = require("sequelize");

const Item = sequelize.define("item", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Item;
