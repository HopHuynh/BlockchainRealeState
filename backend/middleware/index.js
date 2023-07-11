const verifySignUp = require("./verifySignUp");
const authJwt = require("./authJwt");
const verifySignUp2 = verifySignUp.checkDuplicateUsernameOrEmail;
const authJwt2 = authJwt.verifyToken;
module.exports = {
  verifySignUp2,
  authJwt2,
};
