// All password dependent routes go here
const router = require('express').Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary');

const Users = require('../models/userModel');
const Photos = require('../models/photoModel');
const { guestNumber } = require('../utils/guestNumber');
const { guestSeed } = require('../utils/guestSeed');
const { deleteGuest } = require('../utils/deleteGuest');

//save this as a config later
const jwtSecret = process.env.JWT_SECRET;

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
      console.log(error);
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
      console.log(error);
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

router.post('/signature', async (req, res, next) => {
  const timestamp = new Date().getTime();
  const signature = await cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUDINARY_SECRET
  );
  if (timestamp && signature) res.status(200).json({ timestamp, signature });
  else res.status(500);
});

router.delete('/guest/:id', (req, res, next) => {
  const { id } = req.params;
  deleteGuest(id)
    .then(() => {
      res.status(200);
    })
    .catch((err) => console.log(err));
});

// adds guest user, then deletes it in an hour
router.get('/guest/create', async (req, res, next) => {
  const userInfo = await guestNumber();
  const hash = bcrypt.hashSync(userInfo.password, 5);
  userInfo.password = hash;

  Users.addUser(userInfo)
    .then((user) => {
      const guestPhotos = guestSeed(user.id);
      guestPhotos.forEach((photo) => {
        Photos.addPhoto(photo);
      });

      setTimeout(() => {
        deleteGuest(user.id);
      }, 86400000);

      const token = signToken(user);
      res.status(201).json({ ...user, password: '**********', token });
    })
    .catch((err) => console.log(err));
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
