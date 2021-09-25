const { Schema, model } = require("mongoose");

const shopSchema = new Schema(
  {
    name: {
      unique: true,
      type: String,
      required: true,
      minlength: 4,
      maxlength: 20,
      trim: true,
      set: (value) =>
        value.charAt(0).toUpperCase() + value.substring(1).toLowerCase(),
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },

    password: {
      type: String,
      minlength: 4,
      required: true,
    },

    email: {
      type: String,
      unique: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "is invalid"],
      lowercase: true,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      minlength: 1,
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      required: true
    },

    role: {
      type: String,
      default: "Shop",
      required: true,
      enum: ["Shop", "Premium", "Bestseller"],
    },

    avatar: {
      type: String,
      required: true
    },

    validated: {
      type: Boolean,
      default: false,
      required: true
    }
  },
  { timestamps: true }
);

const Shop = model("Shop", shopSchema);

module.exports = Shop;
