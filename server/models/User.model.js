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
      // required: true,
      trim: true,
    },
 
    address: {
      type: String,
      minlength: 1,   
    },

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
      required: true
    },

    avatar: {
      type: String,
      default: "to-do.png",
    },

    //if already exists in form -> don't create
    favouritePlants: {
        type: Schema.Types.ObjectId,
        ref: "Plant"},
    
    // si ya tenemos el seller dentro del usuario como lo referenciamos??
    // ref  object id
    favouriteSeller: {
      type: [String],  
    },
  },
  { timestamps: true }
);

const User = model('User', userSchema)

module.exports = User;
