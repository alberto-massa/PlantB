const { Schema, model } = require("mongoose");

const plantSchema = new Schema({
  name: {
    unique: true,
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
    trim: true,
    set: (value) =>
      value.charAt(0).toUpperCase() + value.substring(1).toLowerCase(),
  },

  image: {
      default: "to-do.png",
      type: String
  },

  description: {
      type: String
  },

  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  size: {
    type: String,
  },

  type: {
    type: String
  },

  toxic: {
    type: Boolean,
  },

  location: {
    type: String,
    enum: ["Indoors", "Outdoors"],
  },

  temperature: {
    type: Number,
  },

  watering: {
    type: String,
  },
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
