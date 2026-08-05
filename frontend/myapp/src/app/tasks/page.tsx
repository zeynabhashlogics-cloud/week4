"use client";

import { useEffect, useState } from "react";
import type {Task} from "../types/task";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      const url = process.env.NEXT_PUBLIC_API_URL;

      if (!url) {
        setError("API URL is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${url}/tasks`);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks.");
        }

        const list: Task[] = await response.json();

        setTasks(list);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch tasks.");
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  function next() {
    if (index < tasks.length - 1) {
      setIndex(index + 1);
    }
  }

  function previous() {
    if (index > 0) {
      setIndex(index - 1);
    }
  }

  // Loading state
  if (loading) {
    return <p>Loading tasks...</p>;
  }

  // Error state
  if (error) {
    return <p>{error}</p>;
  }

  // Empty state
  if (tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  const task = tasks[index];

  // Success state
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-96 text-center">
        <div className="mb-6">
          <p className="mb-2">ID: {task.id}</p>
          <p className="mb-2">Status: {task.status}</p>
          <p className="mb-2">Priority: {task.priority}</p>
          <p>Title: {task.title}</p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={previous}
            disabled={index === 0}
            className="bg-green-600 text-white border border-green-700 px-4 py-2 rounded-md disabled:bg-gray-400"
          >
            Previous
          </button>

          <button
            onClick={next}
            disabled={index === tasks.length - 1}
            className="bg-green-600 text-white border border-green-700 px-4 py-2 rounded-md disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}