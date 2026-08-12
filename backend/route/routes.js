import express from "express";
import tasks from "../data/tasks.js";

const router = express.Router();

const validPriority = ["low", "medium", "high"];
const validStatus = ["pending", "completed"];



router.get("/tasks", (req, res) => {
  res.json(tasks);
});




router.post("/tasks", (req, res) =>
   {
  const { title, status, priority } = req.body;

  if (
    typeof title !== "string" ||
    typeof status !== "string" ||
    typeof priority !== "string"
  ) {
    return res.status(400).json({
      message: "title, status and priority must be strings",
    });
  }

  const cleanTitle = title.trim();
  const cleanStatus = status.trim();
  const cleanPriority = priority.trim();

  if (!cleanTitle) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!validPriority.includes(cleanPriority))
     {
    return res.status(400).json({
      message: "Invalid priority",
    });
  }

  if (!validStatus.includes(cleanStatus))
     {
    return res.status(400).json({
      message: "Invalid status",
    });
  }
let maxID;

if (tasks.length > 0) 
  {
  maxID = Math.max(...tasks.map((task) => task.id));
  } 
else
  {
  maxID = 0;
  }

  const newTask =
  {
    id: maxID + 1,
    title: cleanTitle,
    status: cleanStatus,
    priority: cleanPriority,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});




router.get("/tasks/:id", (req, res) =>
   {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1)
     {
    return res.status(400).json({
      message: "not a positive integer",
    });
  }

  const task = tasks.find((task) => task.id === id);

  if (!task)
     {
    return res.status(404).json({
      message: "No task",
    });
  }

  res.json(task);
});




router.patch("/tasks/:id", (req, res) =>
   {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1)
     {
    return res.status(400).json({
      message: "not a positive integer",
    });
  }

  const task = tasks.find((task) => task.id === id);

  if (!task)
    {
    return res.status(404).json({
      message: "No task",
    });
  }

  const { title, status, priority } = req.body;

  if (title !== undefined)
     {
    if (typeof title !== "string" || !title.trim())
       {
      return res.status(400).json({
        message: "Invalid title",
      });
    }

    task.title = title.trim();
  }

  if (status !== undefined)
     {
    if ( typeof status !== "string" || !validStatus.includes(status.trim()) ) 
      {
      return res.status(400).json({
        message: "Invalid status",
      });
    }

    task.status = status.trim();
  }

  if (priority !== undefined) 
    {
    if (
      typeof priority !== "string" || !validPriority.includes(priority.trim()))
       {
      return res.status(400).json({
        message: "Invalid priority",
      });
    }

    task.priority = priority.trim();
  }
  res.json(task);
});


router.delete("/tasks/:id", (req, res) => 
  {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) 
    {
    return res.status(400).json({
      message: "ID must be a positive integer",
    });
  }

  const index = tasks.findIndex((task) => task.id === id);

  if (index< 0) 
    {
    return res.status(404).json({
      message: "No task",
    });
  }

  const deleted = tasks.splice(index, 1);

  res.json({
    message: "Task deleted",
    task: deleted[0],
  });
});

export default router;