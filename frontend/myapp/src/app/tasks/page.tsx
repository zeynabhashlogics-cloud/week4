"use client";

import { useEffect, useState } from "react";

type Task = 
{
  id: number;
  status: string;
  priority: string;
  title: string;
};

export default function TaskPage()
 {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => 
    {
    async function loadTasks() 
    {
      const url = process.env.NEXT_PUBLIC_API_URL;

      if (!url) 
        {
        throw new Error("API URL is missing");
      }

      const response = await fetch(`${url}/tasks`);

      if (!response.ok) 
        {
        throw new Error("cannot fetch");
      }

      const list: Task[] = await response.json();

      setTasks(list);
    }

    loadTasks();
  },[]);

  const task = tasks[index];

  function next() 
  {
    if (index < tasks.length - 1)
       {
      setIndex(index + 1);
    }
  }

  function previous()
   {
    if (index > 0) 
      {
      setIndex(index - 1);
    }
  }

  if (!task) 
    {
    return <p>No tasks</p>;
  }

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
            className="bg-green-600 text-white border border-green-700 px-4 py-2 rounded-md disabled:bg-gray-400"
          >
            Previous
          </button>

          <button
            onClick={next}
            className="bg-green-600 text-white border border-green-700 px-4 py-2 rounded-md disabled:bg-gray-400"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}