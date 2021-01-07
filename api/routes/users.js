var express = require('express');
var router = express.Router();

const User = require('../models/userModel');
const Photos = require('../models/photoModel');

// returns list of photo ids from specified user
router.get('/:userid/photos', (req, res, next) => {
  const { userid } = req.params;

  User.getUploadedPhotosByUserId(userid)
    .then((photo_ids) => {
      Photos.getPhotosByIds(photo_ids['uploaded_photos'])
        .then((photos) => res.status(200).json(photos))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

// deletes a user and all photos uploaded by them
router.delete('/:userid', (req, res, next) => {
  const { userid } = req.params;

  User.getUploadedPhotosByUserId(userid).then((photos) => {
    Photos.deletePhotos(photos['uploaded_photos']).then(() => {
      User.deleteUser(userid)
        .then(() =>
          res
            .status(200)
            .json({ message: `successfully deleted user ${userid}` })
        )
        .catch((err) => next(err));
    });
  });
});

module.exports = router;