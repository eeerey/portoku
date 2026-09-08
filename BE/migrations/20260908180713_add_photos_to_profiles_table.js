exports.up = function(knex) {
  return knex.schema.table('profiles', function(table) {
    table.json('photos').nullable(); // Menampung array URL foto profil
  });
};

exports.down = function(knex) {
  return knex.schema.table('profiles', function(table) {
    table.dropColumn('photos');
  });
};