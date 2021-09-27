const express = require("express");
const Cart = require("../models/Cart.model")
const Plant = require("../models/Plant.model");
const router = express.Router();

router.get("/:id", (req, res) => {
    const {id} = req.params

    Plant
        .findById(id)
        .populate("sellerId")
        .then((plant) => res.status(200).json(plant))
        .catch((err) => res.status(500).json({
            code: 500,
            message: "Error retrieving Plant",
            err
        }));
})

router.post("/", (req, res) => {

    Cart
        .create(cart)
        .then((cart => res.status(200).json({
                cart,
                message: "Cart created"
            }))
        .catch(err => res.status(500).json({
            code: 500,
            message: "Error creating Cart",
            err
        })))
})

router.put("/:id", (req, res) => {
  const { id } = req.params;
  Cart.findByIdAndUpdate(id, req.body, { new: true })
    .then((cart) => res.status(200).json({ cart, message: "Cart edited" }))
    .catch((err) =>
      res.status(500).json({ code: 500, message: "Error editing", err })
    );
});

module.exports = router;