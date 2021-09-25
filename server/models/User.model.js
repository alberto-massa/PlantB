const { Schema, model } = require("mongoose");

const userSchema = new Schema({
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
    maxlength: 20,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "is invalid"],
    lowercase: true,
    required: true,
    trim: true
  },

  age: {
    type: Number,
    min: 1,
    max: 10,
    match: /[0-6]{3}[A-C]/,
  },

  role: {
    type: String,
    default: "User",
    required: true,
    enum: ["Guest", "User", "Admin"],
  },

  avatar: {
    type: String,
    default: "to-do.png"
  },

  favouritePlants: {
    type: [Number],
    unique: true
  },

  favouriteSeller: {
    type: [Number],
    unique: true
  }

},{timestamps: true});

const User = mongoose.model('User', userSchema)

module.exports = User;
