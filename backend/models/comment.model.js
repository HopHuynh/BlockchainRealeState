const mongooes = require("mongoose");
const commentSchema = new mongooes.Schema(
  {
    content: {
      type: String,
    },
    post: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "Post",
    },

    user: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
let Comment = mongooes.model("Comment", commentSchema);
module.exports = { Comment };
