exports.up = function (knex) {
  return knex.schema.createTable("socials", function (table) {
    table.increments("id").primary();
    table.string("platform").notNullable(); // Contoh: GitHub, LinkedIn, Instagram
    table.string("iconName").notNullable();  // Nama ikon (Simple Icons)
    table.string("url").notNullable();       // URL Akun Media Sosial
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("socials");
};