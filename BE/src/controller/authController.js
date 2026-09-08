const User = require("../models/authmodels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findByUsername(username);

    if (!user) {
      return res.status(400).json({ message: "Username tidak ditemukan!" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Password salah!" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET || "secretkey123",
      { expiresIn: "1d" },
    );

    res.json({ success: true, message: "Login berhasil!", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
