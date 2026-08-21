import express from "express";
import "dotenv/config";

import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const router = express.Router();

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const validPriority = ["low", "medium", "high"];
const validStatus = ["pending", "completed"];

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await prisma.tasks.findMany();

    res.json(tasks);
  } 
  catch (error) 
  {
    console.error("did not fetch tasks ",error);

    res.status(500).json({
      message: "Did not fetch tasks",
    });
  }
});


router.post("/tasks", async (req, res) => {
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

  if (!validStatus.includes(status.trim())) {
    return res.status(400).json({
      message: "status must be pending or completed",
    });
  }

  if (!validPriority.includes(priority.trim())) {
    return res.status(400).json({
      message: "priority must be low, medium or high",
    });
  }

  if (!title.trim()) {
    return res.status(400).json({
      message: "title cannot be empty",
    });
  }

  try {
    
    let user = await prisma.user.findFirst();

    
    if (!user)
       {
      user = await prisma.user.create({
        data: {
          name: "Test User",
          age: 20,
        },
      });
    }

    const task = await prisma.tasks.create({
      data: {
        title: title.trim(),
        status: status.trim(),
        priority: priority.trim(),
        userId: user.id,
      },
    });

    res.status(201).json(task);
  } catch (error) 
  {
    console.error("failed to create task" ,error);

    res.status(500).json({
      message: "Failed to create task",
    });
  }
});


router.get("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "ID is not a positive integer",
    });
  }

  try {
    const task = await prisma.tasks.findUnique({
      where: {
        id: id,
      },
    });

    if (!task) {
      return res.status(404).json({
        message: "No task found",
      });
    }

    res.json(task);
  } catch (error) {
    console.error("failed to fetch task" ,error);

    res.status(500).json({
      message: "Failed to fetch task",
    });
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "ID is not a positive integer",
    });
  }

  const { title, status, priority } = req.body;

  if (title === undefined && status === undefined && priority === undefined) {
    return res.status(400).json({
      message: "At least one field is required",
    });
  }

  if (title !== undefined) {
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "title is not valid",
      });
    }
  }

  if (status !== undefined) {
    if (
      typeof status !== "string" ||
      !validStatus.includes(status.trim())
    ) {
      return res.status(400).json({
        message: "status must be pending or completed",
      });
    }
  }

  if (priority !== undefined) {
    if (
      typeof priority !== "string" ||
      !validPriority.includes(priority.trim())
    ) {
      return res.status(400).json({
        message: "priority must be low, medium or high",
      });
    }
  }

  try {
    const task = await prisma.tasks.update({
      where: {
        id: id,
      },
      data: {
        ...(title !== undefined && {
          title: title.trim(),
        }),
        ...(status !== undefined && {
          status: status.trim(),
        }),
        ...(priority !== undefined && {
          priority: priority.trim(),
        }),
      },
    });

    res.json(task);
  } catch (error) {
    console.error("failed to update task" ,error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "No task found",
      });
    }

    res.status(500).json({
      message: "Failed to update task",
    });
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      message: "ID must be a positive integer",
    });
  }

  try {
    const deletedTask = await prisma.tasks.delete({
      where: {
        id: id,
      },
    });

    res.json({
      message: "Task deleted",
      task: deletedTask,
    });
  } catch (error) {
    console.error("failed to delete task" ,error);

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "No task found",
      });
    }

    res.status(500).json({
      message: "Failed to delete task",
    
    });
  }
});

export default router;