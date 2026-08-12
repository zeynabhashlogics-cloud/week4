"use client";

import { useEffect, useState } from "react";
import type { Task } from "../types/task";

type Props = 
{
  task: Task;
  Updated: (task: Task) => void;
};

export default function UpdateTask({ task, Updated }: Props) 
{
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);

  const [titleError, setTitleError] = useState("");
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    setTitle(task.title);
    setStatus(task.status);
    setPriority(task.priority);
    setTitleError("");
    setApiError("");
    setSuccessMessage("");
  }, [task]);

  async function updateTask( event: React.FormEvent<HTMLFormElement>)
   {
    event.preventDefault();

    setTitleError("");
    setApiError("");
    setSuccessMessage("");

    if (!title.trim()) 
      {
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
            title: title.trim(),
            status,
            priority,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) 
        {
        setApiError(data.message || "Failed to update task");
        return;
      }

      Updated(data);
      setSuccessMessage("Task updated successfully");

    }
     catch (error)
     {
      console.error(error);
      setApiError("Unable to connect to the server");
    }
  }

  function resetForm() 
  {
    setTitle(task.title);
    setStatus(task.status);
    setPriority(task.priority);
    setTitleError("");
    setApiError("");
    setSuccessMessage("");
  }

  return (
    <form onSubmit={updateTask}>

      <h2 className="text-xl font-bold mb-4">
        Edit Task
      </h2>

      {apiError && (
        <p className="text-red-600 mb-3">
          {apiError}
        </p>
      )}

      {successMessage && (
        <p className="text-green-600 mb-3">
          {successMessage}
        </p>
      )}

 
      <div className="mb-4">
        <label className="block mb-1">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setTitleError("");
            setApiError("");
          }}
          className="border rounded-md p-2 w-full bg-[#8ebd55]"
        />

        {titleError && (
          <p className="text-red-500 mt-1">
            {titleError}
          </p>
        )}
      </div>

      
      <div className="mb-4">
        <label className="block mb-1">
          Status
        </label>

        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            setApiError("");
          }}
          className="border rounded-md p-2 w-full bg-[#4e9cad]"
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

    
      <div className="mb-4">
        <label className="block mb-1">
          Priority
        </label>

        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            setApiError("");
          }}
          className="border rounded-md p-2 w-full bg-[#d8e080]"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

    
      <div className="flex gap-2 justify-center">
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600"
        >
          Save
        </button>

        <button
          type="button"
          onClick={resetForm}
          className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600"
        >
          Cancel
        </button>
      </div>

    </form>
  );
}