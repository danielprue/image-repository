const router = require('express').Router();

const User = require('../models/userModel');
const Photos = require('../models/photoModel');
const { skipCloudinaryDelete } = require('../utils/skipCloudinaryDelete');

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

router.get('/all', (req, res, next) => {
  Photos.getAllPhotos()
    .then((photos) => res.status(200).json(photos))
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get('/batch/:photoIds', (req, res, next) => {
  let photoIds = req.params.photoIds.split(',');
  photoIds = photoIds.map((id) => {
    return parseInt(id);
  });
  Photos.getPhotosByIds(photoIds)
    .then((photos) => {
      res.status(200).json(photos);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/:photoid', (req, res, next) => {
  const { photoid } = req.params;
  Photos.getPhotoByPublicId(photoid)
    .then((photo) => res.status(200).json(photo))
    .catch((err) => next(err));
});

router.get('/tags/:tag', (req, res, next) => {
  const { tag } = req.params;
  Photos.getPhotosByTag(tag)
    .then((photos) => res.status(200).json(photos))
    .catch((err) => {
      console.log(err);
    });
});

router.post('/upload', (req, res, next) => {
  const photo = req.body;
  Photos.addPhoto(photo)
    .then((photo) => res.status(200).json(photo))
    .catch((err) => console.log(err));
});

router.post('/search', (req, res, next) => {
  const { search_term, search_type, user } = req.body;
  if (search_type === 'all-images') {
    Photos.getPhotosBySearch(search_term)
      .then((photos) => res.status(200).json(photos))
      .catch((err) => console.log(err));
  } else if (search_type === 'my-favs') {
    User.getUserFavorites(user).then((favs) => {
      Photos.getFavPhotosBySearch(search_term, favs.favorites)
        .then((photos) => res.status(200).json(photos))
        .catch((err) => console.log(err));
    });
  } else if (search_type === 'my-uploads') {
    Photos.getUploadedPhotosBySearch(search_term, user)
      .then((photos) => res.status(200).json(photos))
      .catch((err) => console.log(err));
  }
});

router.delete('/:photoid', (req, res, next) => {
  const { photoid } = req.params;

  Photos.getPublicIdById(photoid).then((pid) => {
    if (!skipCloudinaryDelete.includes(pid.public_id)) {
      cloudinary.v2.uploader
        .destroy(pid.public_id, (error, result) => {})
        .catch((err) => console.log(err));
    }
  });
  Photos.deletePhoto(photoid)
    .then((photo) => res.status(200).json(photo))
    .catch((err) => console.log(err));
});

router.put('/:photoid', (req, res, next) => {
  const { photoid } = req.params;
  const { updates } = req.body;

  Photos.updatePhoto(photoid, updates).then((numRows) => {
    res
      .status(200)
      .json(numRows)
      .catch((err) => console.log(err));
  });
});

module.exports = router;
