const asyncHandler = require("express-async-handler");
const {
  createResume,
  getResumes,
  replaceResume,
  deleteResume
} = require("../services/resumeService");
const logger = require("../utils/logger");
const cloudinary = require("../config/Cloudinary");

exports.createResume = asyncHandler(async (req, res) => {
    logger.info("Adding resume for user:", req.user.id);
    const data = await createResume(req.user.id, req.body);
    res.json(data);
});


exports.getResumes = asyncHandler(async (req, res) => {
  const data = await getResumes(req.user.id);
  res.json(data);
});


exports.replaceResume = asyncHandler(async (req, res) => {
  const data = await replaceResume(
    req.user.id,
    req.params.id,
    req.body,
    cloudinary
  );
  res.json(data);
});


exports.deleteResume = asyncHandler(async (req, res) => {
  await deleteResume(req.user.id, req.params.id, cloudinary);
  res.json({ message: "Resume deleted successfully" });
});