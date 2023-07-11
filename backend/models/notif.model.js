const mongooes = require("mongoose");
const NotificationSchema = new mongooes.Schema({
  userId: {
    type: String,
  },
  username: {
    type: String,
  },
  userWallet: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Read", "Unread"],
    default: "Unread",
  },
  postId: {
    type: String,
  },
  type: {
    type: String,
  },
  to: {
    type: String,
  },
  detail: {
    type: String,
  },
});
let Notif = mongooes.model("Notification", NotificationSchema);
module.exports = { Notif };
