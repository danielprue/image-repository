exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('username').notNullable();
      tbl.string('password').notNullable();
      tbl
        .specificType('uploaded_photos', 'int[]')
        .notNullable()
        .defaultTo('{}');
    })
    .createTable('photos', (tbl) => {
      tbl.increments('id').primary();
      tbl.string('public_id').notNullable();
      tbl.string('name').notNullable();
      tbl.string('image_path').notNullable();
      tbl.integer('height').notNullable();
      tbl.integer('width').notNullable();
      tbl.string('description').notNullable().defaultTo('');
      tbl.specificType('tags', 'text[]').notNullable().defaultTo('{}');
      tbl.integer('uploader').notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('photos').dropTableIfExists('users');
};
