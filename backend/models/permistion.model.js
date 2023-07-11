const mongooes = require("mongoose");
const permistionSchema = new mongooes.Schema({
  name: {
    type: String,
  },
  user_permistions: [
    {
      type: mongooes.Schema.Types.ObjectId,
      ref: "User_Permistion",
    },
  ],
});
let Permistion = mongooes.model("Permistion", permistionSchema);
module.exports = { Permistion };
