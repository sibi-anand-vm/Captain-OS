const asyncHandler = require("express-async-handler");
const logger = require("../utils/logger");

const {
  syncLeetcodeService,
  getDashboardService,
  disconnectLeetcodeService,
  updateLeetcodeUsernameService,
} = require("../services/leetcodeService");

const requireUser = (req) => {
  const userId = req?.user?.id;
  if (!userId) throw new Error("Unauthorized");
  return userId;
};

const syncLeetcode = asyncHandler(async (req, res) => {
  const userId = requireUser(req);
  const { leetcodeUsername } = req.body || {};

  logger.info(`User ${userId} syncing LeetCode`);

  const data = await syncLeetcodeService(userId, leetcodeUsername);
  res.status(200).json(data);
});

const getDashboard = asyncHandler(async (req, res) => {
  const userId = requireUser(req);

  logger.info(`User ${userId} fetching dashboard`);

  const data = await getDashboardService(userId);
  res.status(200).json(data);
});

const disconnectLeetcode = asyncHandler(async (req, res) => {
  const userId = requireUser(req);
  const response = await disconnectLeetcodeService(userId);
  res.status(200).json(response);
});

const updateLeetcodeUsername = asyncHandler(async (req, res) => {
  const userId = requireUser(req);
  const { leetcodeUsername } = req.body || {};

  const updated = await updateLeetcodeUsernameService(userId, leetcodeUsername);
  res.status(200).json(updated);
});

module.exports = {
  syncLeetcode,
  getDashboard,
  disconnectLeetcode,
  updateLeetcodeUsername,
};