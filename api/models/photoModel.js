const photodb = require('../dbConfig');
// id
// name
// image_path
// description
// tags
// uploader

module.exports = {
  addPhoto,
  deletePhoto,
  deletePhotos,
  getPhotoById,
  getPhotosByIds,
  getPhotosByTag,
  getPhotosBySearch,
};

// addPhoto -- add row to photo table
function addPhoto(photo) {
  return photodb('photos')
    .insert(photo, 'id')
    .then(([id]) => {
      return getPhotoById(id);
    });
}

// deletePhoto -- remove row from photo table with matching id
function deletePhoto(id) {
  return photodb('photos').where({ id }).first().delete();
}

// deletePhotos -- remove rows from photo table with matching ids
function deletePhotos(ids) {
  return photodb('photos').whereIn('id', ids).delete();
}

// getPhotoById -- query table for row that matches id
function getPhotoById(id) {
  return photodb('photos').where({ id }).first();
}

// getPhotosByIds -- query table for multiple ids
function getPhotosByIds(ids) {
  return photodb('photos').whereIn('id', ids);
}

// getPhotosByTag -- query table for photos that contain a given tag
function getPhotosByTag(tag) {
  return photodb('photos').where('tags', '@>', tag);
}

// getPhotosBySearch -- query table for photos with names like a search term
function getPhotosBySearch(search_term) {
  return photodb('photos').where('name', 'like', `%${search_term}%`);
}
