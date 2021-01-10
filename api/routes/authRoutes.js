// All password dependent routes go here
const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

//save this as a config later
const jwtSecret = 'save this as a env var later';

// register a new user
router.post('/register', (req, res, next) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 5);
  user.password = hash;

  Users.addUser(user)
    .then((saved) => {
      const token = signToken(saved);
      res.status(201).json({ ...saved, password: '**********', token });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/login', (req, res, next) => {
  let { username, password } = req.body;

  Users.findUserByUsername(username)
    .first()
    .then((user) => {
      return sendResultToUser(req, res, next, user, password);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/verify/:token', (req, res, next) => {
  let { token } = req.params;
  decoded = jwt.verify(token, jwtSecret);
  if (decoded.exp) {
    console.log(Date.now(), decoded.exp * 1000);
    const expired = Date.now() >= decoded.exp * 1000;
    res.status(200).json({ expired: expired });
  } else res.status(500);
});

function signToken(user) {
  const payload = {
    id: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: '1d',
  };

  return jwt.sign(payload, jwtSecret, options);
}

function sendResultToUser(req, res, next, user, password) {
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = signToken(user);

    res.status(200).json({ token, id: user.id, username: user.username });
  } else {
    res.status(401).json({ message: 'Invalid Credentials' });
  }
}

module.exports = router;
