const userdb = require('../dbConfig');
// id (PK)
// username
// password
// uploaded_photos

module.exports = {
  addUser,
  findUserById,
  findUserByUsername,
  getUploadedPhotosByUserId,
  deleteUser,
};

// addUser -- insert row into users table
function addUser(user) {
  return userdb('users')
    .insert(user, 'id')
    .then(([id]) => {
      return findUserById(id);
    });
}

// findUserById -- query user table and return row with matching id
function findUserById(id) {
  return userdb('users').where({ id }).first();
}

// findUserByUsername -- query user table and return row with matching username
function findUserByUsername(username) {
  return userdb('users').where('username', username);
}

// getUploadedPhotosByUserId -- query user table and return only uploaded_photos from row with matching id
function getUploadedPhotosByUserId(id) {
  return userdb('users').select('uploaded_photos').where({ id }).first();
}

// deleteUser -- remove row from users table with matching id
function deleteUser(id) {
  return userdb('users').where({ id }).first().delete();
}
