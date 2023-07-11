const mongooes = require("mongoose");
const authDocSchema = new mongooes.Schema({
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
let AuthDocSchema = mongooes.model("AuthDoc", authDocSchema);
module.exports = { AuthDocSchema };
