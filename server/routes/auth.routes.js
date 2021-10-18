const router = require("express").Router();
const User = require("./../models/User.model");
const Cart = require("./../models/Cart.model");
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", (req, res) => {
  const { username, password, email, age, role, address, avatar} = req.body;

  User.findOne({ username })
    .then((user) => {
      if (user) {
        res.status(400).json({ code: 400, message: "Username already exists" });
        return;
      }

      User.findOne({ email }).then((emailFound) => {
        if (emailFound) {
          res.status(400).json({ code: 400, message: "Email already exists" });
          return;
        }
      });

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      console.log(address)
      Cart.create({total:0})
        .then(cart =>
          User.create({
            username,
            password: hashPass,
            email,
            age,
            role,
            address,
            avatar,
            cart: cart._id
          })

          )      
        .then((user) => {
          req.session.currentUser = user;
          res.status(200).json({user});
        })
        .catch((err) =>
          res.status(500).json({
            code: 500,
            message: "You must fullfill all fields.",
            err: err.message,
          })
        );
    })
    .catch((err) =>
      res.status(500).json({
        code: 500,
        message: "You must fullfill all fields.",
        err: err.message,
      })
    );
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.status(401).json({ code: 401, message: "Username not registered" });
        return;
      }

      if (bcrypt.compareSync(password, user.password) === false) {
        res.status(401).json({ code: 401, message: "Incorrect password" });
        return;
      }

      req.session.currentUser = user;
      res.json(req.session.currentUser);
    })
    .catch((err) =>
      res.status(500).json({
        code: 500,
        message: "DB error while fetching user",
        err: err.message,
      })
    );
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => res.json({ message: "Logout successful" }));
});

router.post("/isloggedin", (req, res) => {
    req.session.currentUser
    ? res.json(req.session.currentUser)
    : res.status(401).json({ code: 401, message: "Unauthorized" });
});

module.exports = router;
