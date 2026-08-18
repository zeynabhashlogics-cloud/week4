"use client";

import { useState } from "react";
import type { Task } from "../types/task";

type Props = {
  Added: (task: Task) => void;
};

export default function AddTask({ Added }: Props) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const [titleError, setTitleError] = useState("");
  const [prioError, setPrioError] = useState("");
  const [statusError, setStatusError] = useState("");

  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function Submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setTitleError("");
    setPrioError("");
    setStatusError("");
    setApiError("");
    setSuccessMessage("");

  
    if (!title.trim()) {
      setTitleError("Title is required");
      return;
    }

    if (!["low", "medium", "high"].includes(priority)) {
      setPrioError("Invalid priority");
      return;
    }

    if (!["pending", "completed"].includes(status)) {
      setStatusError("Invalid status");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
        {
          method: "POST",
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

      if (!response.ok) {
        setApiError(data.message || "Failed to add task");
        return;
      }

      Added(data);
      setSuccessMessage("Task added successfully");
      clearForm();

    } catch (error) {
      console.error(error);
      setApiError("Unable to connect to the server");
    }
  }

  function clearForm() 
  {
    setTitle("");
    setPriority("");
    setStatus("");

    setTitleError("");
    setPrioError("");
    setStatusError("");
  }

  return (
    <form onSubmit={Submit}>

      <h2 className="text-xl font-bold mb-4">
        Add Task
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

    
      <input
        type="text"
         
        value={title}
      
        onChange={(e) => {
          setTitle(e.target.value);
          setTitleError("");
          setApiError("");
        }}
        placeholder="Task title"
        className="border rounded-md p-2 w-full mb-1 bg-[#8ebd55] border p-2 rounded-md"
      />

      {titleError && (
        <p className="text-red-600 mb-3">
          {titleError}
        </p>
      )}

  
      <select
        value={priority}
        onChange={(e) => {
          setPriority(e.target.value);
          setPrioError("");
          setApiError("");
        }}
        className="border rounded-md p-2 w-full bg-[#4e9cad] mb-1"
      >
        <option value="">Select priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {prioError && (
        <p className="text-red-600 mb-3">
          {prioError}
        </p>
      )}

  
      <select
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setStatusError("");
          setApiError("");
        }}
        className="border rounded-md p-2 w-full mb-1 bg-[#d8e080]"
      >
        <option value="">Select status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      {statusError && (
        <p className="text-red-600 mb-3">
          {statusError}
        </p>
      )}

    
      <div className="flex gap-2 justify-center mt-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 rounded-md"
        >
          Submit
        </button>

        <button
          type="button"
          onClick={clearForm}
          className="bg-green-600 text-white px-5 py-2 rounded-md"
        >
          Clear
        </button>
      </div>

    </form>
  );
}