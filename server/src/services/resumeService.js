const Resume = require("../models/Resume");
const InterviewApplication = require("../models/InterviewApplication"); 
const logger = require("../utils/logger");


const createResume = async (userId, data) => {
  const resume = await Resume.create({
    user: userId,
    ...data
  });

  logger.info(`Resume created for user ${userId}`);
  return resume;
};

const getResumes = async (userId) => {
  return await Resume.find({ user: userId }).sort({ createdAt: -1 });
};

const replaceResume = async (userId, resumeId, data, cloudinary) => {
  const existing = await Resume.findOne({ _id: resumeId, user: userId });

  if (!existing) {

    const notFoundError = new Error("Resume not found");
    notFoundError.statusCode = 404;
    throw notFoundError;
  }

  await cloudinary.uploader.destroy(existing.publicId, {
        resource_type: "raw"
});

  const updated = await Resume.findOneAndUpdate(
    { _id: resumeId, user: userId },
    data,
    { new: true }
  );

  logger.info(`Resume replaced for user ${userId}`);
  return updated;
};

const deleteResume = async (userId, resumeId, cloudinary) => {

    let error = null;
  const existing = await Resume.findOne({ _id: resumeId, user: userId });

  if (!existing) {
    const notFoundError = new Error("Resume not found");
    notFoundError.statusCode = 404;
    throw notFoundError;
  }

  const usedCount = await InterviewApplication.countDocuments({
    user: userId,
    resumeId: resumeId
  });

  if (usedCount > 0) {
    error = new Error(`Cannot delete resume. It is used in ${usedCount} applications.`);
    error.statusCode = 400;
    throw error;
  }


  await cloudinary.uploader.destroy(existing.publicId);

  await Resume.deleteOne({ _id: resumeId });

  logger.info(`Resume deleted for user ${userId}`);
};

module.exports = {
  createResume,
  getResumes,
  replaceResume,
  deleteResume
};