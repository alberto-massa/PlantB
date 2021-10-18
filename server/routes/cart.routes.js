const express = require("express");
const Cart = require("../models/Cart.model");
const Plant = require("../models/Plant.model");
const router = express.Router();
const { isLoggedIn } = require("./../middleware/index.js");

router.get("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  
  Cart.findById(id)
    .populate("items")
    .then((plant) => res.status(200).json(plant))
    .catch((err) =>
      res.status(500).json({
        code: 500,
        message: "Error retrieving cart",
        err,
      })
    );
});

router.post("/", isLoggedIn, (req, res) => {
  const cart = req.body;

  Cart.create(cart).then(
    ((cart) =>
      res.status(200).json({
        cart,
        message: "Cart created",
      })).catch((err) =>
      res.status(500).json({
        code: 500,
        message: "Error creating Cart",
        err,
      })
    )
  );
});

router.put("/delete/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  console.log("delete", id);
  console.log(req.body);

  const { plantId } = req.body
  console.log(plantId)

  Cart.findByIdAndUpdate(id, { $pull: { items: plantId }}, {new:true})
    .then((cart) => res.status(200).json({ cart, message: "Cart edited" })) 
    .catch((err) =>
      res.status(500).json({ code: 500, message: "Error editing", err })
    );
});

router.put("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;
  console.log("holaaaa");
  console.log(req.body);

  const { plantId } = req.body  

  Cart.findByIdAndUpdate(id, { $push: { items: plantId }}, { new: true })
    .then((cart) => res.status(200).json({ cart, message: "Cart edited" }))
    .catch((err) =>
      res.status(500).json({ code: 500, message: "Error editing", err })
    );
});




module.exports = router;
