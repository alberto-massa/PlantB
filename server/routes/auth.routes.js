const router = require("express").Router();
const Shop = require("./../models/Shop.model")
const User = require('./../models/User.model')
const bcrypt = require("bcrypt")
const bcryptSalt = 10



router.post('/signup', (req, res) => {

  const { username, password, email, age, role, avatar, favouritePlants, favouriteSeller } = req.body

  User
    .findOne({ username })
    .then(user => {

      if (user) {
        res.status(400).json({ code: 400, message: 'Username already exixts' })
        return
      }

      const salt = bcrypt.genSaltSync(bcryptSalt)
      const hashPass = bcrypt.hashSync(password, salt)
      User
        .create({ username, password: hashPass, email, age, role, avatar, favouritePlants, favouriteSeller })
        .then(() => res.json({ code: 200, message: 'User created' }))
        .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user', err: err.message }))
    })
    .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err: err.message }))
})



router.post('/signup-shop', (req, res) => {

    const { name, password, email, address, role, avatar } = req.body
  
    Shop
      .findOne({ name })
      .then(shop => {
  
        if (shop) {
          res.status(400).json({ code: 400, message: 'name already exixts' })
          return
        }
  
        const salt = bcrypt.genSaltSync(bcryptSalt)
        const hashPass = bcrypt.hashSync(password, salt)
        Shop
          .create({ name, password: hashPass, email, address, role, avatar })
          .then(() => res.json({ code: 200, message: 'Shop created' }))
          .catch(err => res.status(500).json({ code: 500, message: 'DB error while creating user', err: err.message }))
      })
      .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err: err.message }))
  })




router.post('/login', (req, res) => {

  const { username, password } = req.body

  User
    .findOne({ username })
    .then(user => {

      if (!user) {
        res.status(401).json({ code: 401, message: 'Username not registered' })
        return
      }

      if (bcrypt.compareSync(password, user.password) === false) {
        res.status(401).json({ code: 401, message: 'Incorrect password' })
        return
      }

      req.session.currentUser = user
      res.json(req.session.currentUser)
    })
    .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err: err.message }))
})



router.post('/login-shop', (req, res) => {

    const { name, password } = req.body
  
    Shop
      .findOne({ name })
      .then(shop => {
  
        if (!shop) {
          res.status(401).json({ code: 401, message: 'name not registered' })
          return
        }
  
        if (bcrypt.compareSync(password, shop.password) === false) {
          res.status(401).json({ code: 401, message: 'Incorrect password' })
          return
        }
  
        req.session.currentUser = shop
        res.json(req.session.currentUser)
      })
      .catch(err => res.status(500).json({ code: 500, message: 'DB error while fetching user', err: err.message }))
  })



router.get('/logout', (req, res) => {
  req.session.destroy((err) => res.json({ message: 'Logout successful' }));
})



router.post("/isloggedin", (req, res) => {
  req.session.currentUser ? res.json(req.session.currentUser) : res.status(401).json({ code: 401, message: 'Unauthorized' })
})

module.exports = router;
