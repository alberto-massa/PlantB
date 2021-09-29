const express = require("express");
const Checkout = require("../models/Checkout.model");
const Cart = require("../models/Cart.model");
const router = express.Router();
const { isLoggedIn } = require("./../middleware/index.js")

router.get("/:id", isLoggedIn, (req, res) => {
  const { id } = req.params;

  Cart
    .findById(id)
    .then((cart) => res.status(200).json(cart))
    .catch((err) => res.status(500).json({ code: 500, message: "Error retrieving Cart", err }))
});

router.post("/", isLoggedIn, (req, res) => {
  Checkout
    .create(checkout)
    .then(((checkout) => res.status(200).json({ checkout, message: "Check-out created" })))
    .catch((err) => res.status(500).json({ code: 500, message: "Error creating Check-out", err }))
});


//ADD PAYMENT OPTIONS?

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   Checkout.findByIdAndUpdate(id, req.body, { new: true })
//     .then((checkout) => res.status(200).json({ checkout, message: "Checkout edited" }))
//     .catch((err) =>
//       res.status(500).json({ code: 500, message: "Error editing", err })
//     );
// });

module.exports = router;
