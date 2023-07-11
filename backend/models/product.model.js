const mongooes = require("mongoose");
const productSchema = new mongooes.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  area: {
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
  user: {
    type: mongooes.Schema.Types.ObjectId,
    ref: "User",
  },
});
let Product = mongooes.model("Product", productSchema);
module.exports = { Product };
