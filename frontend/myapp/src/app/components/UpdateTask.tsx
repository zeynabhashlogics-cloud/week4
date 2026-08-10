"use client";

import { useState } from "react";
import type { Task } from "../types/task";

type Props = {
  task: Task;
};

export default function UpdateTask({ task }: Props) {
  const [form, setForm] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [priority, setPrio] = useState(task.priority);

  const [titleError, setTitleError] = useState("");

  async function updateTask()
   {

    // Inline validation
    if (title.trim() === "") {
      setTitleError("Title is required");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            status,
            priority,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.log(data.message);
        return;
      }

      console.log("Task updated =", data);

      setForm(false);
    } catch (error) {
      console.log("Task not updated", error);
    }
  }

  function resetform() {
    setTitle(task.title);
    setStatus(task.status);
    setPrio(task.priority);
    setTitleError("");
  }

  return (
    <div>
      {!form ? (
        <button
          onClick={() => setForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Edit Task
        </button>
      ) : (
        <form onSubmit={updateTask}>

          <h2 className="text-xl font-bold mb-4">
            Edit Task
          </h2>

          <div className="mb-4">
            <label>Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError("");
              }}
              className="border p-2 w-full"
            />

            {titleError && (
              <p className="text-red-500">
                {titleError}
              </p>
            )}
          </div>

      
          <div className="mb-4">
            <label>Status</label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="mb-4">
            <label>Priority</label>

            <select
              value={priority}
              onChange={(e) => setPrio(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex gap-3">

            <button
              type="submit"
              
            >
              Save
            </button>

            <button
              type="button"
              onClick={resetform}
              
            >
              Reset
            </button>

            <button
              type="button"
              onClick={() => {
                resetform();
                setForm(false);
              }}
          
            >
              Cancel
            </button>

          </div>
        </form>
      )}
    </div>
  );
}