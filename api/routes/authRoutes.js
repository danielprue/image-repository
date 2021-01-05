// All password dependent routes go here
const router = require('express').Router();

const bcrypt = require('bcryptjs');
const Users = require('../models/userModel');

// register a new user
// TODO add tokens
router.post('/register', (req, res, next) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 5);
  user.password = hash;

  Users.addUser(user)
    .then((saved) => {
      res.status(201).json({ ...saved, password: '**********' });
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
});

router.post('/login', (req, res, next) => {
  let { username, password } = req.body;

  Users.findUserByUsername(username)
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ message: 'login successful' });
      } else {
        res.status(401).json({ message: 'invalid credentials' });
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
