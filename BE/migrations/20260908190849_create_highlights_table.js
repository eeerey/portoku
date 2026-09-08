/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("highlights", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable(); // Contoh: "Focus", "Experience"
    table.string("value").notNullable(); // Contoh: "Full Stack Dev", "3+ Years"
    table.string("iconName").notNullable(); // Contoh: "Code2", "Briefcase", "Zap"
    table.string("position").nullable(); // Opsional: untuk posisi kustom (misal: "-bottom-4 -left-6")
    table.timestamps(true, true); // created_at & updated_at
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("highlights");
};
