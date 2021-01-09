const usersData = require('./data/seed_users');
const photoData = require('./data/seed_photos');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      return knex('photos').del();
    })
    .then(function () {
      // Inserts seed entries
      return knex('users').insert(usersData);
    })
    .then(function () {
      return knex('users')
        .pluck('id')
        .then((userIds) => {
          const photos = [];
          for (let i = 0; i < photoData.length; i++) {
            photos.push({
              ...photoData[i],
              uploader: userIds[i % userIds.length],
            });
          }
          return knex('photos').insert(photos);
        });
    });
};
