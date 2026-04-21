const axios = require("axios");
const logger = require("../utils/logger");
const Leetcode = require("../models/LeetCode");

async function fetchLeetCodeData(username) {
  logger.info(`Fetching LeetCode data for username: ${username}`);

  const response = await axios.post(
    "https://leetcode.com/graphql",
    {
      operationName: "getDashboardData",
      variables: { username },
      query: `
        query getDashboardData($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              userAvatar
              ranking
              reputation
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
              totalSubmissionNum {
                difficulty
                count
              }
            }
            languageProblemCount {
              languageName
              problemsSolved
            }
            tagProblemCounts {
              advanced { tagName problemsSolved }
              intermediate { tagName problemsSolved }
              fundamental { tagName problemsSolved }
            }
            badges {
              displayName
              icon
            }
          }
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            topPercentage
          }
          recentSubmissionList(username: $username) {
            title
            statusDisplay
            lang
            timestamp
          }
        }
      `,
    },
    { headers: { "Content-Type": "application/json" } }
  );

  return formatLeetCodeData(response?.data?.data, username);
}

function formatLeetCodeData(payload, username) {
  const user = payload?.matchedUser;
  let error = null;

  logger.info(`Formatting LeetCode data for user: ${username}`);

  if (!user) {
    logger.warn(`No user data found for username: ${username}`);
    error = new Error(`Invalid LeetCode username: ${username}`);
    error.statusCode = 400;
    throw error;
  }

  const solved = user?.submitStats?.acSubmissionNum || [];
  const totalSub = user?.submitStats?.totalSubmissionNum || [];

  const easy = solved.find((d) => d.difficulty === "Easy")?.count || 0;
  const medium = solved.find((d) => d.difficulty === "Medium")?.count || 0;
  const hard = solved.find((d) => d.difficulty === "Hard")?.count || 0;

  const totalSolved = easy + medium + hard;
  const totalAttempts = totalSub.find((d) => d.difficulty === "All")?.count || 0;
  const accepted = solved.find((d) => d.difficulty === "All")?.count || totalSolved;
  const failed = Math.max(0, totalAttempts - accepted);

  const tagData = user.tagProblemCounts || {};
  const topicStats = [
    ...(tagData.fundamental || []),
    ...(tagData.intermediate || []),
    ...(tagData.advanced || []),
  ].map((tag) => ({ topic: tag.tagName, count: tag.problemsSolved }));

  const badges = (user.badges || []).map((badge) => ({
    name: badge.displayName,
    icon: badge.icon,
  }));

  const recentSubmissions = (payload?.recentSubmissionList || [])
    .slice(0, 20)
    .map((sub) => ({
      title: sub.title,
      status: sub.statusDisplay,
      language: sub.lang,
      timestamp: new Date(Number(sub.timestamp) * 1000),
    }));

  return {
    totalSolved,
    easySolved: easy,
    mediumSolved: medium,
    hardSolved: hard,

    ranking: user?.profile?.ranking ?? null,
    reputation: user?.profile?.reputation ?? null,
    avatar: user?.profile?.userAvatar ?? null,

    contestRating: payload?.userContestRanking?.rating || 0,
    contestGlobalRanking: payload?.userContestRanking?.globalRanking || 0,
    contestsAttended: payload?.userContestRanking?.attendedContestsCount || 0,

    submissionAccepted: accepted,
    submissionFailed: failed,

    languages: user.languageProblemCount || [],
    topicStats,
    badges,
    recentSubmissions,
  };
}

async function syncLeetcodeService(userId, username) {

  let error = null;

  logger.info(`Syncing LeetCode for user ${userId}`);

  if (!username) {
    error = new Error("Username required");
    error.statusCode = 400;
    throw error;
  }

  const data = await fetchLeetCodeData(username);

  const saved = await Leetcode.findOneAndUpdate(
    { user: userId },
    {
      user: userId,
      leetcodeUsername: username,
      ...data,
      lastSynced: new Date(),
    },
    { new: true, upsert: true }
  );

  return saved;
}

async function getDashboardService(userId) {

  let error = null;

  logger.info(`Fetching dashboard for user ${userId}`);

  const data = await Leetcode.findOne({ user: userId });

  if (!data) {
    error = new Error("No data found. Please connect LeetCode first.");
    error.statusCode = 404;
    throw error;
  }

  if (!data.lastSynced) return data;

  const hoursSinceLastSync = (Date.now() - data.lastSynced.getTime()) / (1000 * 60 * 60);
  if (hoursSinceLastSync <= data.syncIntervalHours) return data;

  logger.info(`Refreshing stale data for user ${userId}`);
  const freshData = await fetchLeetCodeData(data.leetcodeUsername);

  const updated = await Leetcode.findOneAndUpdate(
    { user: userId },
    { ...freshData, lastSynced: new Date() },
    { new: true }
  );

  return updated;
}

async function disconnectLeetcodeService(userId) {
  logger.info(`Disconnecting LeetCode for user ${userId}`);
  await Leetcode.findOneAndDelete({ user: userId });
  return { message: "LeetCode disconnected successfully" };
}

async function updateLeetcodeUsernameService(userId, username) {

  let error = null;

  logger.info(`Updating username for user ${userId}`);
  if (!username) {
    error = new Error("Username required");
    error.statusCode = 400;
    throw error;
  }

  const data = await fetchLeetCodeData(username);

  const updated = await Leetcode.findOneAndUpdate(
    { user: userId },
    { leetcodeUsername: username, ...data, lastSynced: new Date() },
    { new: true, upsert: true }
  );

  return updated;
}

module.exports = {
  syncLeetcodeService,
  getDashboardService,
  disconnectLeetcodeService,
  updateLeetcodeUsernameService,
};