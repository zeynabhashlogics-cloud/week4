import express from "express";
import tasks from "../data/tasks.js";

const router = express.Router();

router.get("/tasks", (req, res) => 
  {
  res.json(tasks);
});

export default router;