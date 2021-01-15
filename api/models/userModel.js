const userdb = require('../dbConfig');
// id (PK)
// username
// password
// isGuest
// favorites

module.exports = {
  addUser,
  findUserById,
  findUserByUsername,
  getIsGuest,
  getUserFavorites,
  addFavorite,
  removeFavorite,
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

// getIsGuest -- query user table by id and return isGuest
function getIsGuest(id) {
  return userdb('users').select('isGuest').where({ id }).first();
}

// getUserFavorites -- query user table by id and return list of favorites
function getUserFavorites(id) {
  return userdb('users').select('favorites').where({ id }).first();
}

// addFavorite -- adds id of image to a user's array of favorites
function addFavorite(user_id, photo_id) {
  return userdb('users')
    .where('id', user_id)
    .update({
      favorites: userdb.raw('array_append(favorites, ?)', [photo_id]),
    });
}

// removeFavorite -- removes id of image from a user's array of favorites
function removeFavorite(user_id, photo_id) {
  return userdb('users')
    .where('id', user_id)
    .update({
      favorites: userdb.raw('array_remove(favorites, ?)', [photo_id]),
    });
}

// deleteUser -- remove row from users table with matching id
function deleteUser(id) {
  return userdb('users').where({ id }).first().delete();
}
