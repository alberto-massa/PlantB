const { Schema, model } = require("mongoose");

const invoiceSchema = new Schema({
    total: {
      type: Schema.Types.ObjectId,
      ref: "Checkout"

    },
  
  },
  {
    timestamps: true,
  }
);

const Invoice = model("Invoice", invoiceSchema);

module.exports = Invoice;