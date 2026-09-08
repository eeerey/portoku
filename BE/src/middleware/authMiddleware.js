const jwt = require("jsonwebtoken");

const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res
      .status(401)
      .json({ message: "Akses ditolak! Token tidak ditemukan." });

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "secretkey123",
    );
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token tidak valid atau kadaluarsa." });
  }
};

module.exports = verifyAdminToken;
