const router = require('express').Router();

const { intersect } = require('../dbConfig');
const Photos = require('../models/photoModel');

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
      console.log('error');
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
