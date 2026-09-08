const db = require("../../config/db");

class Skill {
  static async getAll() {
    return db("skills");
  }

  static async create(data) {
    return db("skills").insert(data);
  }

  static async delete(id) {
    return db("skills").where({ id }).del();
  }
}

module.exports = Skill;
