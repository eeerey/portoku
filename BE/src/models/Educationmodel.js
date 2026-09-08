const db = require("../../config/db");

class Education {
  static async getAll() {
    return db("education");
  }
  static async create(data) {
    return db("education").insert(data);
  }
  static async update(id, data) {
    return db("education").where({ id }).update(data);
  }
  static async delete(id) {
    return db("education").where({ id }).del();
  }
}

module.exports = Education;
