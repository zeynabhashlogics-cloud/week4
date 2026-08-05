import express from "express";
import tasks from "../data/tasks.js";

const router = express.Router();

router.get("/tasks", (req, res) => 
  {
  res.json(tasks);
});

router.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  // Invalid ID
  if (isNaN(id)) {
    return res.status(400).json({
      message: "not valid id",
    });
  }

  const task = tasks.find((task) => task.id === id);

  // Task not found
  if (!task) {
    res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});
export default router;
