const mongooes = require("mongoose");
const roomOrderSchema = new mongooes.Schema({
  sellerId: {
    type: String,
  },
  BuyerIds: {
    type: mongooes.Schema.Types.ObjectId,
    ref: "User",
  },
  postId: {
    type: String,
  },
  namePost: {
    type: String,
  },

  status: {
    type: Boolean,
  },
});
let RoomOrder = mongooes.model("RoomOrder", roomOrderSchema);
module.exports = { RoomOrder };
