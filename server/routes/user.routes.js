const express = require("express");
const User = require("../models/User.model");
const router = express.Router();

router.get("/", (req, res) => {
  User.find()
    .then(Users => res.status(200).json(Users))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving Users", err }))
})

router.get("/:username", (req, res) => {
  const { username } = req.params;
  User.find(username)
    .then(User => res.status(200).json({ User, message: "User getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single User", err }))
})

router.post("/", (req, res) => {
  const User = req.body;
  User.create(User)
    .then(User => res.status(200).json({ User, message: "User created" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error creating User", err }))
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `User ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting User", err }))
})

router.put("/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(User => res.status(200).json({ User, message: "User edited" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error editing", err }))
})



module.exports = router;