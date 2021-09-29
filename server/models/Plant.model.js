const { Schema, model } = require("mongoose");

const plantSchema = new Schema({
  name: {
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
    type: String,
  },

  comment: [
    {
      type: Schema.ObjectId,
      ref: "Comment",
    },
  ],

  description: {
    size: {
      type: String,
    },

    type: {
      type: String,
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
  },

  buyerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  sellerId: {
    type: Schema.Types.ObjectId,
    ref: "User", //add shop -> to joint with user (maybe role)
    required: true,
  },

  price: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Plant = model("Plant", plantSchema);

module.exports = Plant;
