"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Task } from "../types/task";
import UpdateTask from "../components/UpdateTask";
import AddTask from "../components/AddTask";

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [index, setIndex] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);


  useEffect(() => {
    async function loadTasks() {
      const token = localStorage.getItem("token");
      const url = process.env.NEXT_PUBLIC_API_URL;

      if (!token) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      setLoggedIn(true);

      if (!url) {
        setError("URL is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${url}/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch tasks.");
        }

        const list: Task[] = data;

        setTasks(list);
        setIndex(0);
      } catch (error) {
        console.error(error);

        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("error");
        }
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function deleteTask(id: number) {
    const url = process.env.NEXT_PUBLIC_API_URL;
    const token = localStorage.getItem("token");

    if (!url || !token) {
      setError("You must be logged in.");
      return;
    }

    try {
      const response = await fetch(`${url}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete task.");
      }

      const newTasks = tasks.filter((task) => task.id !== id);

      setTasks(newTasks);

      if (newTasks.length === 0) {
        setIndex(0);
      } else if (index >= newTasks.length) {
        setIndex(newTasks.length - 1);
      }

      setError("");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("error");
      }
    }
  }

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
    setTasks((prev) => {
      const newTasks = [...prev, newTask];

      setIndex(newTasks.length - 1);

      return newTasks;
    });

    setError("");
  }

  function TaskUpdated(updatedTask: Task) {
    setTasks((prev) => {
      return prev.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } else {
          return task;
        }
      });
    });

    setError("");
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Loading tasks...</p>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#e0e8cf]">
        <div className="text-center">
          <h1 className="mb-6 text-2xl font-bold">
            Login or register to access tasks
          </h1>

          <div className="flex justify-center gap-4">
            <Link
              href="/auth/login"
              className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            >
              Login
            </Link>

            <Link
              href="/auth/register"
              className="rounded bg-green-500 px-6 py-2 text-white hover:bg-green-600"
            >
              Register
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#e0e8cf] py-10">
      <h1 className="text-3xl font-bold text-left mb-6">
        Your Tasks
      </h1>

      {error && (
        <p className="text-red-600 mb-6">
          {error}
        </p>
      )}

      {tasks.length === 0 ? (
        <div className="w-[500px] bg-white border rounded-lg p-10">
          <p className="text-center mb-6">
            No tasks available.
          </p>

          <AddTask Added={TaskAdded} />
        </div>
      ) : (
        <>
          <div className="bg-[#9fb079] shadow-lg text-center rounded-lg p-10 w-[800px]">

            <div className="mb-6">

              <p className="mb-2 bg-yellow-100 w-[200px] mx-auto py-1 rounded-lg text-xs font-semibold">
                ID: {tasks[index].id}
              </p>

              <p className="mb-2 bg-yellow-100 w-[200px] py-1 mx-auto rounded-lg text-xs font-semibold">
                Status: {tasks[index].status}
              </p>

              <p className="mb-2 bg-yellow-100 py-1 w-[200px] mx-auto rounded-lg text-xs font-semibold">
                Priority: {tasks[index].priority}
              </p>

              <p className="bg-yellow-100 py-1 mx-auto rounded-lg w-[200px] text-xs font-semibold">
                Title: {tasks[index].title}
              </p>

            </div>

            <div className="flex justify-center gap-4">

              <button
                onClick={previous}
                disabled={index === 0}
                className="bg-blue-400 text-white border border-blue-400 px-4 py-2 rounded-md disabled:bg-gray-300"
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

            <div className="w-[385px] bg-[#91a1c9] shadow-lg rounded-lg p-10 text-center">
              <AddTask
                Added={TaskAdded}
              />
            </div>

            <div className="w-[385px] bg-[#91a1c9] shadow-lg rounded-lg p-10 text-center">
              <UpdateTask
                key={tasks[index].id}
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



