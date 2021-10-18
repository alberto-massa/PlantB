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
  console.log("--------------------------",username)
  User.find({username})
    .then(user => res.status(200).json({ user, message: "user getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single User", err }))
})

router.post("/", isLoggedIn, (req, res) => {
  const { user } = req.body;
  User.create(user)
    .then(user => res.status(200).json({ user, message: "user created" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error creating User", err }))
})

router.delete("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `user ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting User", err }))
})

router.put("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  console.log(req.body)
  User.findByIdAndUpdate(id, req.body, { new: true })
    .then(user => res.status(200).json({ user, message: "user edited" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error editing", err }))
})



module.exports = router;