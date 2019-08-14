const express = require("express");
const router = express.Router();
const Item = require("../../models/Item");
const { body, check, validationResult } = require("express-validator");

// List all Items
router.get("/", (req, res) => {
  Item.findAll()
    .then(items => {
      res.json(items);
    })
    .catch(err => console.log(err));
});

// Add new item
router.post(
  "/",
  [
    check("name")
      .not()
      .isEmpty()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    Item.create({
      name: req.body.name
    })
      .then(item => res.json(item))
      .catch(err => res.status(400).json(err));
  }
);

// Remove Item
router.delete("/:id", (req, res) => {
  Item.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.json({ success: true });
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;
