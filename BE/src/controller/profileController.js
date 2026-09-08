const Profile = require("../models/profilemodel");

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.get();
    await Profile.update(profile.id, req.body);
    res.json({ message: "Profile berhasil diperbarui!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
