const express = require("express");
const router = express.Router();

const {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication
} = require("../controllers/interviewApplicationController");


router.get("/",getApplications).post("/",createApplication);
router.put("/:id", updateApplication).delete("/:id", deleteApplication);

module.exports = router;