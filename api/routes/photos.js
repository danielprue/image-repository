const router = require('express').Router();

const User = require('../models/userModel');
const Photos = require('../models/photoModel');

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
      next(err);
    });
});

router.post('/upload', (req, res, next) => {
  const photo = req.body;
  console.log(req.body);
  console.log(req.headers);
  Photos.addPhoto(photo)
    .then((photo) => res.status(200).json(photo))
    .catch((err) => console.log(err));
});

router.post('/search', (req, res, next) => {
  const { search_term, search_type, user } = req.body;
  if (search_type === 'all-images') {
    console.log(search_term, search_type);
    Photos.getPhotosBySearch(search_term)
      .then((photos) => res.status(200).json(photos))
      .catch((err) => console.log(err));
  } else if (search_type === 'my-favs') {
    User.getUserFavorites(user).then((favs) => {
      console.log(favs);
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

module.exports = router;
