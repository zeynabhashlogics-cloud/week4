"use client";

import { useEffect, useState } from "react";
import type { Task } from "../types/task";
import UpdateTask from "../components/UpdateTask";
import AddTask from "../components/AddTask";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [index, setIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function deleteTask(id: number) {
    const url = process.env.NEXT_PUBLIC_API_URL;

    try {
      const response = await fetch(`${url}/tasks/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task.");
      }

      const newTasks = tasks.filter((task) => task.id !== id);

      setTasks(newTasks);

      // Keep index valid after deleting
      setIndex((currentIndex) =>
        Math.min(
          currentIndex,
          Math.max(newTasks.length - 1, 0)
        )
      );

      setError("");
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete task."
      );
    }
  }

  useEffect(() => {
    async function loadTasks() {
      const url = process.env.NEXT_PUBLIC_API_URL;

      if (!url) {
        setError("URL is missing.");
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

        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch tasks."
        );
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


  function TaskAdded(newTask: Task) {
    setTasks((prev) => [...prev, newTask]);
    setIndex(tasks.length);
    setError("");
  }


  function TaskUpdated(updatedTask: Task) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === updatedTask.id
          ? updatedTask
          : task
      )
    );

    setError("");
  }

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">

      {error && (
        <p className="text-red-600 mb-6">
          {error}
        </p>
      )}

      {tasks.length === 0 ? (
        <div className="w-[500px] bg-white border border-gray-300 rounded-lg p-10">
          <p className="text-center mb-6">
            No tasks available.
          </p>

          <AddTask Added={TaskAdded} />
        </div>
      ) : (
        <>
         
          <div className="bg-[#ceebd3] border border-gray-300 shadow-lg rounded-lg p-10 w-[800px] text-center">

            <div className="mb-6">
              <p className="mb-2">
                ID: {tasks[index].id}
              </p>

              <p className="mb-2">
                Status: {tasks[index].status}
              </p>

              <p className="mb-2">
                Priority: {tasks[index].priority}
              </p>

              <p>
                Title: {tasks[index].title}
              </p>
            </div>

            <div className="flex justify-center gap-4">

              <button
                onClick={previous}
                disabled={index === 0}
                className="bg-green-400 text-black border border-blue-400 px-4 py-2 rounded-md disabled:bg-gray-300"
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

              <button
                onClick={() => {
                  const confirmDelete = window.confirm(
                    "Delete this task?"
                  );

                  if (confirmDelete) {
                    deleteTask(tasks[index].id);
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Delete
              </button>

            </div>
          </div>

          <div className="flex gap-6 justify-center items-start mt-8">

            <div className="w-[385px] bg-white rounded-lg p-10 text-center">
              <AddTask
                Added={TaskAdded}
              />
            </div>

            <div className="w-[385px] bg-white rounded-lg p-10 text-center">
              <UpdateTask
                task={tasks[index]}
                Updated={TaskUpdated}
              />
            </div>

          </div>
        </>
      )}

    </div>
  );
}