const taskService = require("../services/taskService");
const dashboardService = require("../services/dashboardService");
const logger = require("../utils/logger");

// Create
exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.user.id, req.body);
    logger.info({
      message: "Task created",
      taskId: task._id,
      user: req.user.id
    });
    res.status(201).json(task);
  } catch (err) {
    logger.error({
      message: "Failed to create task",
      error: err.message,
      user: req.user.id
    });
    res.status(400).json({ message: err.message });
  }
};

// Get My Tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getUserTasks(req.user.id);
    logger.info({
      message: "Fetched user tasks",
      count: tasks.length,
      user: req.user.id
    });
    res.json(tasks);
  } catch (err) {
    logger.error({
      message: "Failed to fetch user tasks",
      error: err.message,
      user: req.user.id
    });
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.user.id,
      req.params.id,
      req.body
    );
    logger.info({
      message: "Task updated",
      taskId: task._id,
      user: req.user.id
    });
    res.json(task);
  } catch (err) {
    logger.error({
      message: "Failed to update task",
      error: err.message,
      user: req.user.id
    });
    res.status(404).json({ message: err.message });
  }
};

// Delete
exports.deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.user.id, req.params.id);
    logger.info({
      message: "Task deleted",
      taskId: req.params.id,
      user: req.user.id
    });
    res.json({ message: "Task deleted" });
  } catch (err) {
    logger.error({
      message: "Failed to delete task",
      error: err.message,
      user: req.user.id
    }); 
    res.status(404).json({ message: err.message });
  }
};

// Mark Complete
exports.markComplete = async (req, res) => {
  try {
    const task = await taskService.markComplete(
      req.user.id,
      req.params.id
    );
    logger.info({
      message: "Task marked complete",
      taskId: task._id,
      user: req.user.id
    });
    res.json(task);
  } catch (err) {
    logger.error({
      message: "Failed to mark task complete",
      error: err.message,
      user: req.user.id
    });
    res.status(404).json({ message: err.message });
  }
};

// Dashboard
exports.getDashboard = async (req, res) => {
  try {
    const data = await dashboardService.getDashboard(req.user.id);
    logger.info({
      message: "Fetched dashboard data",
      user: req.user.id
    });
    res.json(data);
  } catch (err) {
    logger.error({
      message: "Failed to fetch dashboard data",
      error: err.message,
      user: req.user.id
    });
    res.status(500).json({ message: err.message });
  }
};