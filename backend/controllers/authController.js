const { User } = require("../models/user.model.js");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  console.log(req.body);
  // Save User to Database
  try {
    await User.create({
      name: req.body.name,
      username: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      birthday: req.body.birthday,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      roles: req.body.roles,
    })
      .then((user) => {
        if (user) {
          res.status(200).send({
            statusCode: 200,
            message: "User was registered successfully!",
            content: user,
          });
        } else {
          res.send({ message: "User was not registered successfully!" });
        }
      })
      .catch((err) => {
        res.send({ message: err.message });
      });
  } catch (err) {
    console.log(err.message);
  }
};
exports.signin = async (req, res) => {
  console.log(req.body);
  await User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      console.log("user 1", user);
      console.log("user 2", req.body.password);
      if (!user) {
        return res.status(400).send({
          statusCode: 400,
          message: "Email not found.",
          content: req.body.email,
        });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          statusCode: 400,
          message: "Invalid Password!",
          content: "password ",
        });
      }
      if (user) {
        var token = jwt.sign(user.id, "secret-key");
        console.log("user role:,", user.email);
        console.log("user role:,", user.roles);
        return res.status(200).send({
          statusCode: 200,
          message: "dang nhap  thanh cong",
          content: {
            id: user.id,
            email: user.email,
            username: user.username,
            accessToken: token,
            roles: user.roles,
            statusCode: 200,
          },
        });
      }
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

exports.resetPassword = async (req, res) => {
  const { email, oldPassword, newPassword, confirmNewPassword } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    console.log("email 1", email);

    if (!user) {
      return res.status(404).json({ message: "Not user" });
    }

    const isPasswordMatched = await bcrypt.compareSync(
      oldPassword,
      user.password
    );

    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Old password not correct" });
    }

    if (confirmNewPassword.length < 6) {
      return res
        .status(401)
        .json({ message: "New password must be more than 6 characters" });
    }

    if (newPassword !== confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    // Tạo mật khẩu mới
    //const decodedPassword = decodePassword(newPassword);
    const hashedPassword = await bcrypt.hashSync(newPassword, 8);

    // Cập nhật mật khẩu mới vào cơ sở dữ liệu
    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({ message: "Updated password" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Error" });
  }
};