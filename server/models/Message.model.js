const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
  {
    authorId: {
      type: [{user:{ type: Schema.ObjectId, ref: 'User' },
      shop:{ type: Schema.ObjectId, ref: 'Shop' }}]
      
    },


    receiverId: {
      type: [{user:{ type: Schema.ObjectId, ref: 'User' },
      shop:{ type: Schema.ObjectId, ref: 'Shop' }}]
      
    },

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
