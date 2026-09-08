const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");
const verifyAdminToken = require("../middleware/authMiddleware");

// Route khusus Admin yang dilindungi Token JWT
router.post("/", verifyAdminToken, projectController.createProject);
router.delete("/:id", verifyAdminToken, projectController.deleteProject);

module.exports = router;
