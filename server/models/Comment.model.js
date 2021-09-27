const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    plantRef: {
      type: Schema.Types.ObjectId,
      ref: "Plant",
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
