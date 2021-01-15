var express = require('express');
var router = express.Router();

const User = require('../models/userModel');
const Photos = require('../models/photoModel');

// returns list of photo ids from specified user
router.get('/:userid/photos', (req, res, next) => {
  const { userid } = req.params;
  Photos.getUploadedPhotosByUserId(userid)
    .then((photos) => {
      res.status(200).json(photos);
    })
    .catch((err) => console.log(err));
});

// returns data about a single user
router.get('/:userid', (req, res, next) => {
  const { userid } = req.params;
  User.findUserById(userid)
    .then((user) => res.status(200).json(user))
    .catch((err) => console.log(err));
});

//returns row matching username
router.get('/name/:username', (req, res, next) => {
  const { username } = req.params;
  User.findUserByUsername(username)
    .then((user) => res.status(200).json(user))
    .catch((err) => console.log(err));
});

//returns photos matching ids in user's favorites
router.get('/:userid/favorites', (req, res, next) => {
  const { userid } = req.params;
  User.getUserFavorites(userid)
    .then((favs) => {
      Photos.getPhotosByIds(favs.favorites)
        .then((photos) => res.status(200).json(photos))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

// updates favorites with additional favorite
router.put('/:userid/favorites/add/:photoid', (req, res, next) => {
  const { userid, photoid } = req.params;
  User.addFavorite(userid, photoid)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => console.log(err));
});

//updates favorites with removed favorite
router.put('/:userid/favorites/remove/:photoid', (req, res, next) => {
  const { userid, photoid } = req.params;
  User.removeFavorite(userid, photoid)
    .then((data) => res.status(200).json(data))
    .catch((err) => console.log(err));
});

// deletes a user and all photos uploaded by them
router.delete('/:userid', (req, res, next) => {
  const { userid } = req.params;

  Photos.getUploadedPhotosByUserId(userid).then((photos) => {
    Photos.deletePhotos(photos['uploaded_photos']).then(() => {
      User.deleteUser(userid)
        .then(() =>
          res
            .status(200)
            .json({ message: `successfully deleted user ${userid}` })
        )
        .catch((err) => console.log(err));
    });
  });
});

module.exports = router;
