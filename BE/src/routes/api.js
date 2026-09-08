const express = require("express");
const router = express.Router();

const Profile = require("../models/profilemodel");
const Education = require("../models/Educationmodel");
const Skill = require("../models/skillsmodel");
const Project = require("../models/Projectmodels");
const Message = require("../models/Messagemodel");
const Social = require("../models/Socialmodel");
const Highlight = require("../models/Highlightmodel");
const verifyAdminToken = require("../middleware/authMiddleware");

// ==========================================
// PUBLIC PORTFOLIO FETCH (GABUNGAN LENGKAP)
// ==========================================
router.get("/portfolio", async (req, res) => {
  try {
    const profile = await Profile.get();
    const education = await Education.getAll();
    const skills = await Skill.getAll();
    const projects = await Project.getAll();
    const socials = await Social.getAll();
    const highlights = await Highlight.getAll(); // <--- Data Highlights ditarik di sini

    res.json({
      profile,
      education,
      skills,
      projects,
      socials: socials || [],
      highlights: highlights || [], // <--- Dikirim ke Front-End
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// SOCIALS CRUD
// ==========================================
router.get("/socials", async (req, res) => {
  try {
    const socials = await Social.getAll();
    res.json(socials || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/socials", verifyAdminToken, async (req, res) => {
  try {
    await Social.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Media sosial berhasil ditambahkan!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/socials/:id", verifyAdminToken, async (req, res) => {
  try {
    await Social.update(req.params.id, req.body);
    res.json({ success: true, message: "Media sosial berhasil diperbarui!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/socials/:id", verifyAdminToken, async (req, res) => {
  try {
    await Social.delete(req.params.id);
    res.json({ success: true, message: "Media sosial berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// PROFILE UPDATE & PHOTO DELETE
// ==========================================
router.put("/profile", verifyAdminToken, async (req, res) => {
  try {
    const profileData = await Profile.get();
    if (!profileData) {
      return res
        .status(404)
        .json({ message: "Data profile tidak ditemukan di database!" });
    }
    await Profile.update(profileData.id, req.body);
    res.json({ success: true, message: "Profile berhasil diperbarui!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/profile/photos", verifyAdminToken, async (req, res) => {
  try {
    const { photoUrl } = req.body;
    const profile = await Profile.get();

    if (!profile) {
      return res.status(404).json({ message: "Data profile tidak ditemukan!" });
    }

    let photos = [];
    if (profile.photos) {
      try {
        photos =
          typeof profile.photos === "string"
            ? JSON.parse(profile.photos)
            : profile.photos;
      } catch {
        photos = [profile.photos];
      }
    }

    const updatedPhotos = photos.filter((url) => url !== photoUrl);

    await Profile.update(profile.id, {
      photos: JSON.stringify(updatedPhotos),
    });

    res.json({
      success: true,
      message: "Foto berhasil dihapus!",
      photos: updatedPhotos,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// EDUCATION CRUD
// ==========================================
router.post("/education", verifyAdminToken, async (req, res) => {
  try {
    await Education.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Education berhasil ditambahkan!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/education/:id", verifyAdminToken, async (req, res) => {
  try {
    await Education.delete(req.params.id);
    res.json({ success: true, message: "Education berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// SKILLS CRUD
// ==========================================
router.post("/skills", verifyAdminToken, async (req, res) => {
  try {
    await Skill.create(req.body);
    res
      .status(201)
      .json({ success: true, message: "Skill berhasil ditambahkan!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/skills/:id", verifyAdminToken, async (req, res) => {
  try {
    await Skill.delete(req.params.id);
    res.json({ success: true, message: "Skill berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// MESSAGES CRUD
// ==========================================
router.get("/messages", verifyAdminToken, async (req, res) => {
  try {
    const messages = await Message.getAll();
    res.json(messages || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/messages/:id", verifyAdminToken, async (req, res) => {
  try {
    await Message.delete(req.params.id);
    res.json({ success: true, message: "Pesan berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ==========================================
// HIGHLIGHTS / BADGES CRUD
// ==========================================
router.get("/highlights", async (req, res) => {
  try {
    const data = await Highlight.getAll();
    res.json(data || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/highlights", verifyAdminToken, async (req, res) => {
  try {
    await Highlight.create(req.body);
    res.json({ success: true, message: "Highlight berhasil ditambahkan!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/highlights/:id", verifyAdminToken, async (req, res) => {
  try {
    await Highlight.update(req.params.id, req.body);
    res.json({ success: true, message: "Highlight berhasil diperbarui!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/highlights/:id", verifyAdminToken, async (req, res) => {
  try {
    await Highlight.delete(req.params.id);
    res.json({ success: true, message: "Highlight berhasil dihapus!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
