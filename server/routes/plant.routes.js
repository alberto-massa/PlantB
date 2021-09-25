const express = require("express");
const Plant = require("../models/Plant.model");
const router = express.Router();

router.get("/", (req, res) => {
  Plant.find()
    .then(plants => res.status(200).json(plants))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving Shops", err }))
})

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Plant.findById(id)
    .then(plant => res.status(200).json({ plant, message: "Plant getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single Plant", err }))
})

router.post("/", (req, res) => {
  const plant = req.body;
  Plant.create(plant)
    .then(plant => res.status(200).json({ plant, message: "Plant created" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error creating Plant", err }))
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Plant.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Plant ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting Plant", err }))
})

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Plant.findByIdAndUpdate(id, req.body, { new: true })
    .then(plant => res.status(200).json({ plant, message: "Plant edited" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error editing", err }))
})



module.exports = router;