const Task = require("../models/Task");

// Create Task
const createTask = async (userId, data) => {
    
  return await Task.create({
    ...data,
    completedAt: null,
    user: userId
  });
};

// Get All Tasks of User
const getUserTasks = async (userId, filters = {}) => {
  return await Task.find({ user: userId, ...filters })
    .sort({ createdAt: -1 });
};

// Get Recent Tasks of User (last 5)
const getUserRecentTasks = async (userId) => {
  return await Task.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);
};

// Update Task
const updateTask = async (userId, taskId, updates) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    updates,
    { new: true }
  );

  if (!task) throw new Error("Task not found");
  return task;
};

// Delete Task
const deleteTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId
  });

  if (!task) throw new Error("Task not found");
  return task;
};

// Mark Complete
const markComplete = async (userId, taskId) => {
  const task = await Task.findOne({
    _id: taskId,
    user: userId
  });

  if (!task) throw new Error("Task not found");

  task.completed = true;
  task.completedAt = new Date();
  await task.save(); // pre-save hook handles completedAt

  return task;
};

module.exports = {
  createTask,
  getUserTasks,
  getUserRecentTasks,
  updateTask,
  deleteTask,
  markComplete
};