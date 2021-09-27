const { Schema, model } = require("mongoose");

const checkoutSchema = new Schema({
    description: {
      type: Schema.Types.ObjectId,
      ref: "Cart"

    },
  },
  {
    timestamps: true,
  }
);

const Checkout = model("Checkout", checkoutSchema);

module.exports = Checkout;
