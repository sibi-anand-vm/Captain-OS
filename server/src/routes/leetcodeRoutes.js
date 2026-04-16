const express = require("express");
const router = express.Router();

const {
  syncLeetcode,
  getDashboard,
  disconnectLeetcode,
  updateLeetcodeUsername
} = require("../controllers/leetcodeController");

router.post("/sync", syncLeetcode);
router.get("/dashboard", getDashboard);
router.delete("/", disconnectLeetcode);
router.put("/username", updateLeetcodeUsername);

module.exports = router;