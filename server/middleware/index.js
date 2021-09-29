const mongoose = require("mongoose");

module.exports = {
  isLoggedIn: (req, res, next) => {
    req.session.currentUser ? next() : res.json({ message: "Error, you have to login before continue" });
  },

  checkRoles:
    (...roles) =>
    (req, res, next) => {
      roles.includes(req.session.currentUser.role)
        ? next()
        : res.json({message: "Error, your role does not match!"});
    },
};
