const mongooes = require("mongoose");
const MessageSchema = new mongooes.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: mongooes.Schema.Types.ObjectId,
    },
    text: {
      type: String,
    },
  },

  { timestamps: true }
);
let Message = mongooes.model("Message", MessageSchema);
module.exports = { Message };
