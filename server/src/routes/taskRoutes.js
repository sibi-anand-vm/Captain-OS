const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");

router.post("/", controller.createTask);
router.get("/", controller.getTasks);
router.get("/recent", controller.getRecentTasks);
router.put("/:id", controller.updateTask);
router.delete("/:id", controller.deleteTask);
router.patch("/:id/complete", controller.markComplete);
router.get("/dashboard/summary", controller.getDashboard);

module.exports = router;