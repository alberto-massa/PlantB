const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
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

    // address: {
    //   type: String,
    //   minlength: 1,
    // },

    age: {
      type: Date,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      default: "User",
      required: true,
      enum: ["User", "Shop", "Admin"],
    },

    validated: {
      type: Boolean,
      default: false,
      required: true,
    },

    avatar: {
      type: String,
      required: true,
      default:
        "https://res.cloudinary.com/dubhsyrde/image/upload/v1633536992/orl5czm2lgcz9a2fzkhu.svg",
    },

    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },

    // favouritePlants: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Plant",
    //   },
    // ],

    // favouriteSeller: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
