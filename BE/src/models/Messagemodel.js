const db = require("../../config/db");

class Message {
  static async getAll() {
    return db("messages").orderBy("createdAt", "desc");
  }
  static async create(data) {
    return db("messages").insert(data);
  }
  static async delete(id) {
    return db("messages").where({ id }).del();
  }
}

module.exports = Message;
