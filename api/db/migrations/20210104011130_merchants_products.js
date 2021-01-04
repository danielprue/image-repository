exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('username').notNullable();
      tbl.string('password').notNullable();
      tbl
        .specificType('uploaded_photos', 'text[]')
        .notNullable()
        .defaultTo('{}');
    })
    .createTable('photos', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('image_path').notNullable();
      tbl.string('descrition').notNullable().defaultTo('');
      tbl.specificType('tags', 'text[]').notNullable().defaultTo('{}');
      tbl.integer('uploader').references('users.id');
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users').dropTableIfExists('photos');
};
