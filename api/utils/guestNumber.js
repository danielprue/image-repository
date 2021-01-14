const Users = require('../models/userModel');

// returns object for details about a new guest account
const guestNumber = async () => {
  let num = 1;
  let validUsername = false;
  while (!validUsername) {
    const user = await Users.findUserByUsername(`guest${num}`);
    if (user.length === 0) validUsername = true;
    else num++;
  }

  console.log(`guest${num}`);

  return {
    username: `guest${num}`,
    password: 'password',
    isGuest: true,
  };
};

module.exports = {
  guestNumber,
};
