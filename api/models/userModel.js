const userdb = require('../dbConfig');
// id (PK)
// username
// password
// uploaded_photos

module.exports = {
  addUser,
  findUserById,
  findUserByUsername,
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

// deleteUser -- remove row from users table with matching id
function deleteUser(id) {
  return userdb('users').where({ id }).first().delete();
}
