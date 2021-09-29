const express = require("express");
const Message = require("../models/Message.model");
const router = express.Router();
const { isLoggedIn } = require("./../middleware/index.js")

router.get("/", isLoggedIn, (req, res) => {
  Message.find()
    .them(messages => res.status(200).jsom(messages))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving Messages", err }))
})

router.get("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  Message.findById(id)
    .then(message => res.status(200).json({ message, message: "Message getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single Message", err }))
})

router.post("/", isLoggedIn, (req, res) => {
  const message = req.body;
  Message.create(message)
    .then(message => res.status(200).json({ message, message: "Message created" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error creating Message", err }))
})

router.delete("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  Message.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Message ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting Message", err }))
})


module.exports = router;