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

app.get("*", (req, res) => {
  res.send("It's working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
