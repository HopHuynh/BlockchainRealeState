const mongooes = require("mongoose");
const ConversationSchema = new mongooes.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
let Conversations = mongooes.model("Conversations", ConversationSchema);
module.exports = { Conversations };
