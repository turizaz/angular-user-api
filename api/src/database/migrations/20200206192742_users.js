
exports.up = function(knex) {
  return knex.raw(`
    create table users
    (
      id serial primary key,
      name text,
      surname text,
      email text
    );
  `);
};

exports.down = function(knex) {
  return knex.raw(`
    drop table users
  `);
};
