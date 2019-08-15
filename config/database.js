const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   "d25chigea5a8dg",
//   "ubiuhcvctxayta",
//   "10812456038dc74898663d2b31ef0b445358c0ff9f3f3fae143681f1fcc18387",
//   {
//     host: "ec2-50-19-109-120.compute-1.amazonaws.com",
//     dialect: "postgres",
//     protocol: "postgres",
//     dialectOptions: {
//       ssl: true
//     }
//   }
// );

const sequelize = new Sequelize("test", "postgres", "postgres", {
  host: "localhost",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
