const mongooes = require("mongoose");
const postSchema = new mongooes.Schema(
  {
    index: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    price: {
      type: String,
    },
    area: {
      type: String,
    },
    floor: {
      type: String,
    },
    juridical: {
      type: String,
    },
    interior: {
      type: String,
    },
    bedroom: {
      type: String,
    },
    usablearea: {
      type: String,
    },
    bathroom: {
      type: String,
    },
    direction: {
      type: String,
    },
    length: {
      type: String,
    },
    wide: {
      type: String,
    },
    status: {
      type: String,
    },
    content: {
      type: String,
    },
    img_url: [
      {
        type: String,
      },
    ],

    comments: [
      {
        type: mongooes.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    user: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
let Post = mongooes.model("Post", postSchema);
module.exports = { Post };
