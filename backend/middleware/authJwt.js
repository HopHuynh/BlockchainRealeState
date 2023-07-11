const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config.js");
const { User } = require("../models/user.model.js");
verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  if (token) token = token.replace("Bearer ", "");
  console.log("token: " + token);

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, "secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded;
    next();
  });
};
const authJwt = {};
authJwt.verifyToken = verifyToken;
module.exports = authJwt;
