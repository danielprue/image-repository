const User = require('../models/userModel');
const Photo = require('../models/photoModel');

const deleteGuest = (id) => {
  Photo.getUploadedPhotosByUserId(id)
    .then((photos) => {
      const photo_ids = photos.map((photo) => photo.id);
      Photo.deletePhotos(photo_ids)
        .then(() => {
          User.deleteUser(id)
            .then((res) => {
              return res;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

module.exports = {
  deleteGuest,
};
