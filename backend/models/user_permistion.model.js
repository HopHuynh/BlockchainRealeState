const mongooes = require("mongoose");
const user_PermistionSchema = new mongooes.Schema({
  content: {
    type: String,
  },
  permistion: {
    type: mongooes.Schema.Types.ObjectId,
    ref: "Permistion",
  },

  user: {
    type: mongooes.Schema.Types.ObjectId,
    ref: "User",
  },
});
let User_Permistion = mongooes.model("User_Permistion", user_PermistionSchema);
module.exports = { User_Permistion };
