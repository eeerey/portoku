const db = require("../../config/db");

class User {
  static async findByUsername(username) {
    return db("users").where({ username }).first();
  }
  static async create(userData) {
    const [id] = await db("users").insert(userData);
    return id;
  }
}

module.exports = User;
