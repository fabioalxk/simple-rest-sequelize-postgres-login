const db = require("./config/database");
const express = require("express");
const sequelize = require("./config/database");
const app = express();
app.use(express.json());

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/api/items", require("./routes/api/Item"));
app.use("/api/users", require("./routes/api/users"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
