const { error } = require("winston");
const InterviewApplication = require("../models/InterviewApplication");
const Resume = require("../models/Resume");
const logger = require("../utils/logger");

const createApplication= async (userId, data) => {
  const { company, role, resumeId } = data;

  let error = null;

  if (!company || !role || !resumeId) {
    error = new Error("Company, role and resume are required");
    error.statusCode = 400;
    throw error;
  }

  const resume = await Resume.findOne({
    _id: resumeId,
    user: userId
  });

  if (!resume) {
    logger.warn(`User ${userId} tried invalid resume ${resumeId}`);
    error = new Error("Invalid resume selected");
    error.statusCode = 400;
    throw error;
  }

  const application = await InterviewApplication.create({
    user: userId,
    company,
    role,
    status: data.status || "Applied",
    resumeId,
    notes: data.notes || ""
  });

  logger.info(`Application created for user ${userId}`);
  return application;
};


const getApplications = async (userId) => {
  return await InterviewApplication.find({ user: userId })
    .populate("resumeId", "name url")
    .sort({ createdAt: -1 });
};


const updateApplication = async (userId, id, data) => {

  let error = null;

  if (data.resumeId) {
    const resume = await Resume.findOne({
      _id: data.resumeId,
      user: userId
    });

    if (!resume) {
      error = new Error("Invalid resume selected");
      error.statusCode = 400;
      throw error;
    }
  }

  const updated = await InterviewApplication.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    { new: true }
  ).populate("resumeId", "name url");

  if(updated) {
    logger.info(`Application updated for user ${userId}`);
    return updated;
  } else {
    error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }


};

const deleteApplication = async (userId, id) => {

  let error = null;

  const deleted = await InterviewApplication.findOneAndDelete({
    _id: id,
    user: userId
  });

  if (!deleted) {
    error = new Error("Application not found");
    error.statusCode = 404;
    throw error;
  }

  logger.info(`Application deleted for user ${userId}`);
};

module.exports = {
  createApplication,
  getApplications,
  updateApplication,
  deleteApplication
};