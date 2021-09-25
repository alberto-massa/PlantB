const express = require("express");
const Shop = require("../models/Shop.model");
const router = express.Router();

router.get("/", (req, res) => {
  Shop.find()
    .then(Shops => res.status(200).json(Shops))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving Shops", err }))
})

router.get("/:name", (req, res) => {
  const { name } = req.params;
  Shop.find(name)
    .then(Shop => res.status(200).json({ Shop, message: "Shop getted" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error retrieving a single Shop", err }))
})

router.post("/", (req, res) => {
  const Shop = req.body;
  Shop.create(Shop)
    .then(Shop => res.status(200).json({ Shop, message: "Shop created" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error creating Shop", err }))
})

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Shop.findByIdAndDelete(id)
    .then(() => res.status(200).json({ message: `Shop ${id} deleted` }))
    .catch(err => res.status(500).json({ code: 500, message: "Error deleting Shop", err }))
})

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Shop.findByIdAndUpdate(id, req.body, { new: true })
    .then(Shop => res.status(200).json({ Shop, message: "Shop edited" }))
    .catch(err => res.status(500).json({ code: 500, message: "Error editing", err }))
})



module.exports = router;