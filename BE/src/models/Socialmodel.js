const db = require("../../config/db");

class Social {
  static async getAll() {
    return db("socials").select("*");
  }

  static async create(data) {
    return db("socials").insert(data);
  }

  static async update(id, data) {
    return db("socials").where({ id }).update(data);
  }

  static async delete(id) {
    return db("socials").where({ id }).del();
  }
}

module.exports = Social;
