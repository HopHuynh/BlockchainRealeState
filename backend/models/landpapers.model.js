const mongooes = require("mongoose");
const LandpapersSchema = new mongooes.Schema(
  {
    content: {
      type: String,
    },
    img_url: {
      type: String,
    },

    file: {
      type: String,
    },
    user: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { timestamps: true }
);
let Landpapers = mongooes.model("Landpapers", LandpapersSchema);
module.exports = { Landpapers };
