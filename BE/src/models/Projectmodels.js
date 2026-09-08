const db = require("../../config/db");

class Project {
  static async getAll() {
    return db("projects");
  }
  static async create(data) {
    return db("projects").insert(data);
  }
  static async update(id, data) {
    return db("projects").where({ id }).update(data);
  }
  static async delete(id) {
    return db("projects").where({ id }).del();
  }
}

module.exports = Project;
