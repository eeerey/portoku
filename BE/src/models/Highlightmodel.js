const db = require("../../config/db"); // sesuaikan dengan file koneksi db/knex kamu

const Highlight = {
  getAll: async () => {
    return await db("highlights").select("*");
  },
  create: async (data) => {
    return await db("highlights").insert(data);
  },
  update: async (id, data) => {
    return await db("highlights").where({ id }).update(data);
  },
  delete: async (id) => {
    return await db("highlights").where({ id }).del();
  },
};

module.exports = Highlight;
