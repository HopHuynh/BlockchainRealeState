const mongooes = require("mongoose");
const userSchema = new mongooes.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },

    birthday: {
      type: String,
    },
    username: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
    },
    img_url: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    products: [
      {
        type: mongooes.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    comments: [
      {
        type: mongooes.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    user_permistions: [
      {
        type: mongooes.Schema.Types.ObjectId,
        ref: "User_Permistion",
      },
    ],
    posts: [
      {
        type: mongooes.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    roles: {
      type: String,
    },
    roomIds: {
      type: mongooes.Schema.Types.ObjectId,
        ref: "RoomOrder",
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { timestamps: true }
);
let User = mongooes.model("User", userSchema);
module.exports = { User };