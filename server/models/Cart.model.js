const { Schema, model } = require("mongoose");

const cartSchema = new Schema( 
  
  {
    total: {
      type: Number,
      default: 0,
      required: true,
    },

    items: [  { type: Schema.Types.ObjectId,ref: "Plant" } ],

    buyer: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      Default: "Pending",
      enum: [ "Pending, Completed", "Shipped", "Delivered" ]

    }
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;