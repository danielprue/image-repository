const photoData = require('./data/seed_photos');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('photos')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('photos').insert(photoData);
    });
};
