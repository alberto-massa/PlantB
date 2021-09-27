const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },

    receiverId: { type: Schema.Types.ObjectId, ref: 'User' },

    subject: {
      type: String,
      required: true,

    },

    content: {
      type: String,
      required: true,

    },
  },
  {
    timestamps: true,
  }
);

const Message = model("Message", messageSchema);

module.exports = Message;
