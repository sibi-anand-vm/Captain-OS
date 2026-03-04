const Task = require("../models/Task");
const logger = require("../utils/logger");

// Weekly %
const getWeeklyStats = async (userId) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const total = await Task.countDocuments({
    user: userId,
    createdAt: { $gte: sevenDaysAgo }
  });

  const completed = await Task.countDocuments({
    user: userId,
    completed: true,
    completedAt: { $gte: sevenDaysAgo }
  });

  const percentage =
    total === 0 ? 0 : ((completed / total) * 100).toFixed(2);

  return { totalTaskThisWeek: total, completedTaskThisWeek: completed, percentage: Number(percentage) };
};

// Streak
const calculateStreak = async (userId) => {
  const tasks = await Task.find({
    user: userId,
    completed: true,
    completedAt: { $ne: null }
  }).select("completedAt");

  const dates = new Set(
    tasks.map(t =>
      t.completedAt.toISOString().split("T")[0]
    )
  );

  let streak = 0;
  let today = new Date();

  while (true) {
    const dateStr = today.toISOString().split("T")[0];
    if (dates.has(dateStr)) {
      streak++;
      today.setDate(today.getDate() - 1);
    } else break;
  }

  return streak;
};

// Dashboard
const getDashboard = async (userId) => {
  const total = await Task.countDocuments({ user: userId });
  const completed = await Task.countDocuments({
    user: userId,
    completed: true
  });

  const completionPercentage =
    total === 0 ? 0 : ((completed / total) * 100).toFixed(2);

  const weeklyStats = await getWeeklyStats(userId);
  const streak = await calculateStreak(userId);

  logger.info({
    message: "Dashboard data fetched",
    userId: userId,
    totalTasks: total,
    completedTasks: completed,
    completionPercentage: completionPercentage,
    weeklyStats: weeklyStats,
    currentStreak: streak
  });

  return {
    totalTasks: total,
    completedTasks: completed,
    completionPercentage: Number(completionPercentage),
    weeklyStats: weeklyStats,
    currentStreak: streak
  };
};

module.exports = {
  getDashboard
};