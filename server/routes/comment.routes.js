const express = require("express");
const Comment = require("../models/Comment.model");
const Plant = require("../models/Plant.model");
const router = express.Router();

router.get("/", (req, res) => {
  Comment.find()
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving Comment", err }))
})

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Plant.findById(id)
    .populate('comment')
    .then(comment => res.status(200).json({ comment, message: "Comment getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single Comment", err }))
})

router.post("/", (req, res) => {
  const comment = req.body;
  Comment.create(comment)
    .then(comment => res.status(200).json({ comment, message: "Comment created" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error creating Comment", err }))
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Comment.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Comment ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting Comment", err }))
})



module.exports = router;