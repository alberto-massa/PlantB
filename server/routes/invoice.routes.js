const express = require("express");
const Checkout = require("../models/Cart.model");
const Invoice = require("../models/Invoice.model");
const router = express.Router();
const { isLoggedIn } = require("./../middleware/index.js")



router.get("/:id", isLoggedIn, (req, res) => {
    const { id } = req.params;

    Checkout
        .findById(id)
        .then((checkout) => res.status(200).json(checkout))
        .catch((err) => res.status(500).json({ code: 500, message: "Error retrieving Check-out", err }));
});

router.post("/", isLoggedIn, (req, res) => {

    Invoice
        .create(invoice)
        .then(((invoice) => res.status(200).json({ invoice, message: "Invoice created" })))
        .catch((err) => res.status(500).json({ code: 500, message: "Error creating Invoice", err }))
});

// router.put("/:id", isLoggedIn, (req, res) => {
//     const { id } = req.params;

//     Cart
//         .findByIdAndUpdate(id, req.body, { new: true })
//         .then((cart) => res.status(200).json({ cart, message: "Cart edited" }))
//         .catch((err) => res.status(500).json({ code: 500, message: "Error editing", err }))
// });

module.exports = router;
