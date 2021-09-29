const express = require("express");
const User = require("../models/User.model");
const router = express.Router();
const { isLoggedIn } = require("./../middleware/index.js")

router.get("/", isLoggedIn, (req, res) => {
  User.find()
    .then(Users => res.status(200).json(Users))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving Users", err }))
})

router.get("/:username", isLoggedIn, (req, res) => {
  const { username } = req.params;
  User.find(username)
    .then(User => res.status(200).json({ User, message: "User getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single User", err }))
})

router.post("/", isLoggedIn, (req, res) => {
  const User = req.body;
  User.create(User)
    .then(User => res.status(200).json({ User, message: "User created" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error creating User", err }))
})

router.delete("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `User ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting User", err }))
})

router.put("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(User => res.status(200).json({ User, message: "User edited" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error editing", err }))
})



module.exports = router;