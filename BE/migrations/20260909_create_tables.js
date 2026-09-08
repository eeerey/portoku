exports.up = function (knex) {
  return (
    knex.schema
      // Tabel Admin User
      .createTable("users", function (table) {
        table.increments("id").primary();
        table.string("username").unique().notNullable();
        table.string("password").notNullable();
        table.timestamps(true, true);
      })
      // Tabel Profile
      .createTable("profiles", function (table) {
        table.increments("id").primary();
        table.string("fullName").notNullable();
        table.string("title").notNullable();
        table.text("subTitle").notNullable();
        table.json("aboutMe").notNullable(); // Disimpan sebagai array JSON Teks
        table.timestamps(true, true);
      })
      // Tabel Education
      .createTable("education", function (table) {
        table.increments("id").primary();
        table.string("school").notNullable();
        table.text("desc").notNullable();
        table.timestamps(true, true);
      })
      // Tabel Skills
      .createTable("skills", function (table) {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("iconName").notNullable();
        table.timestamps(true, true);
      })
      // Tabel Projects
      .createTable("projects", function (table) {
        table.increments("id").primary();
        table.string("title").notNullable();
        table.text("desc").notNullable();
        table.string("imageUrl").nullable();
        table.string("projectUrl").nullable();
        table.timestamps(true, true);
      })
      // Tabel Messages
      .createTable("messages", function (table) {
        table.increments("id").primary();
        table.string("email").notNullable();
        table.text("message").notNullable();
        table.timestamp("createdAt").defaultTo(knex.fn.now());
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("messages")
    .dropTableIfExists("projects")
    .dropTableIfExists("skills")
    .dropTableIfExists("education")
    .dropTableIfExists("profiles")
    .dropTableIfExists("users");
};
