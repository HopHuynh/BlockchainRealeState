const { User } = require("../models/user.model");

const checkRole = {
  isAdmin: async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      console.log(user);
      if (user && user.roles === "admin") {
        next();
      } else {
        res.status(403).json({ error: "Unauthorized" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  isGov: async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      //   console.log(user);
      if (user && user.roles === "government") {
        next();
      } else {
        res.status(403).json({ error: "Unauthorized" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = checkRole;
