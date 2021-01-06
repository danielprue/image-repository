const router = require('express').Router();

const Photos = require('../models/photoModel');

router.get('/batch', (req, res, next) => {
  const { photoIds } = req.body;
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
  Photos.getPhotoById(photoid)
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
  Photos.addPhoto(photo)
    .then((photo) => res.status(200).json(photo))
    .catch((err) => next(err));
});

module.exports = router;
