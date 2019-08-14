const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// list all users
router.get("/listall", (req, res) => {
  User.findAll()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(400).json(err));
});

// register new user
router.post("/register", (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          User.create({ username, email, password: hash })
            .then(user => {
              res.json(user);
            })
            .catch(err => res.status(400).json(err));
        });
      });
    })
    .catch(err => res.status(400).json(err));
});

// login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  User.findOne({ where: { email } })
    .then(user => {
      if (!user) {
        return res.status(400).json({ message: "User doesnt exist" });
      }

      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
          }

          jwt.sign({ id: user.id }, "jwtSecret", {}, (err, token) => {
            res.json({
              token,
              user: {
                username: user.username,
                email: user.email,
                password: user.password
              }
            });
          });
        })
        .catch(err => res.status(400).json(err));
    })
    .catch(err => res.status(400).json(err));
});

// delete user by id

module.exports = router;
