const { User } = require("../models/user.model");
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username,
  }).then((user) => {
    if (user) {
      res.status(400).send({
        statusCode: 400,
        message: "Failed! Username is already in use!",
      });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).then((user) => {
      if (user) {
        res.status(400).send({
          statusCode: 400,
          message: "Failed! Email is already in use!",
        });
        return;
      }
      // User.findOne({
      //   phoneNumber: req.body.phoneNumber,
      // }).then((user) => {
      //   if (user) {
      //     res.status(400).send({
      //       message: "Failed! Phone number is already in use!",
      //     });
      //     return;
      //   }
      //   next();
      // });
      next();
    });
  });
};
const verifySignUp = {};
(verifySignUp.checkDuplicateUsernameOrEmail = checkDuplicateUsernameOrEmail),
  (module.exports = verifySignUp);
