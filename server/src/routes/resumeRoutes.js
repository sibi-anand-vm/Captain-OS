const express = require("express");
const router = express.Router();

const { createResume,getResumes,replaceResume,deleteResume } = require("../controllers/resumeController");


router.get("/", getResumes).post("/", createResume);
router.put("/:id", replaceResume).delete("/:id", deleteResume);

module.exports = router;