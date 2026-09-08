const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Akses Statis Folder Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Dynamic Storage Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = "uploads/misc";
    if (file.fieldname === "profile_photos") {
      uploadPath = "uploads/profile";
    } else if (file.fieldname === "project_image") {
      uploadPath = "uploads/project";
    }
    const fullPath = path.join(__dirname, uploadPath);
    ensureDir(fullPath);
    cb(null, fullPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // Max 20MB
});

// Load Models & Middleware
const Profile = require("./src/models/profilemodel");
const verifyAdminToken = require("./src/middleware/authMiddleware");

// Load Routes
const authRoutes = require("./src/routes/authRoutes");
const projectRoutes = require("./src/routes/projectRoutes");
const apiRoutes = require("./src/routes/api");

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api", apiRoutes);

// 1. Endpoint Upload Foto Profile & Auto-Save ke Database MySQL
app.post("/api/profile/upload-photos", verifyAdminToken, (req, res) => {
  upload.array("profile_photos", 20)(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Tidak ada berkas foto yang diunggah." });
    }

    try {
      const newPhotoUrls = req.files.map(
        (file) => `http://localhost:8000/uploads/profile/${file.filename}`,
      );

      // Ambil data profile lama dan gabungkan dengan foto baru
      const profileData = await Profile.get();
      if (profileData) {
        const existingPhotos = profileData.photos || [];
        const updatedPhotos = [...existingPhotos, ...newPhotoUrls];

        await Profile.update(profileData.id, {
          photos: updatedPhotos,
        });
      }

      res.json({
        success: true,
        message: "Foto profil berhasil diunggah dan disimpan ke database!",
        photos: newPhotoUrls,
      });
    } catch (dbErr) {
      res.status(500).json({ message: `Database Error: ${dbErr.message}` });
    }
  });
});

// 2. Endpoint Upload Gambar Project (Menghasilkan URL Gambar)
app.post("/api/projects/upload-image", verifyAdminToken, (req, res) => {
  upload.single("project_image")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: `Multer Error: ${err.message}` });
    } else if (err) {
      return res.status(500).json({ message: err.message });
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Tidak ada gambar yang diunggah." });
    }

    const imageUrl = `http://localhost:8000/uploads/project/${req.file.filename}`;
    res.json({
      success: true,
      message: "Gambar project berhasil diunggah!",
      imageUrl,
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
