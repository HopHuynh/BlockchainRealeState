const mongooes = require("mongoose");
const authImgSchema = new mongooes.Schema({
  urls: {
    type: Array,
  },
  from: {
    type: String,
  },
  postId: {
    type: String,
  },
});
let AuthImgSchema = mongooes.model("AuthImg", authImgSchema);
module.exports = { AuthImgSchema };
