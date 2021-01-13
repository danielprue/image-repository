const photodb = require('../dbConfig');
// id
// name
// image_path
// description
// tags
// uploader

module.exports = {
  getAllPhotos,
  addPhoto,
  deletePhoto,
  deletePhotos,
  getPhotoById,
  getPhotoByPublicId,
  getPhotosByIds,
  getUploadedPhotosByUserId,
  getPhotosByTag,
  getPhotosBySearch,
};

// getAllPhotos -- returns all rows from photos
function getAllPhotos() {
  return photodb('photos');
}

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

//getPhotoByPublicId -- query table for row that matches cloudinary id
function getPhotoByPublicId(public_id) {
  return photodb('photos').where({ public_id }).first();
}

// getPhotosByIds -- query table for multiple ids
function getPhotosByIds(ids) {
  return photodb('photos').whereIn('id', ids);
}

// getUploadedPhotosByUserId -- query table for rows where given id matches uploader field
function getUploadedPhotosByUserId(uploader) {
  return photodb('photos').where({ uploader });
}

// getPhotosByTag -- query table for photos that contain a given tag
function getPhotosByTag(tag) {
  return photodb('photos').where('tags', '@>', [tag]);
}

// getPhotosBySearch -- query table for photos with names like a search term
function getPhotosBySearch(search_term) {
  return photodb.raw(`select distinct on (id) * 
    from (
      select *, unnest(tags) tag
      from photos) x
    where tag like '%${search_term}%' or name like '%${search_term}%'`);
}
