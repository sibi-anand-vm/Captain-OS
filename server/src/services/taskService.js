const Task = require("../models/Task");


const createTask = async (userId, data) => {
    
  return await Task.create({
    ...data,
    completedAt: null,
    user: userId
  });
};


const getUserTasks = async (userId, filters = {}) => {
  return await Task.find({ user: userId, ...filters })
    .sort({ createdAt: -1 });
};


const getUserRecentTasks = async (userId) => {
  return await Task.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(5);
};


const updateTask = async (userId, taskId, updates) => {

  let error = null;

  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId },
    updates,
    { new: true }
  );

  if (!task)  {
    error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};


const deleteTask = async (userId, taskId) => {

  let error = null;

  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId
  });

  if (!task) {
    error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }
  return task;
};

const markComplete = async (userId, taskId) => {

  let error = null;

  const task = await Task.findOne({
    _id: taskId,
    user: userId
  });

  if (!task) {
    error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  task.completed = true;
  task.completedAt = new Date();
  await task.save(); 

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