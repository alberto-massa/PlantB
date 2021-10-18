const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    userRef: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
    },

    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
