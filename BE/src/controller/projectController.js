const Project = require("../models/Projectmodels");

exports.createProject = async (req, res) => {
  try {
    await Project.create(req.body);
    res.status(201).json({ message: "Proyek berhasil ditambahkan!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.delete(req.params.id);
    res.json({ message: "Proyek berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
