"use client";

import { useEffect, useState } from "react";
import type {Task} from "../types/task";
import UpdateTask from "../components/UpdateTask";
import AddTask from "../components/AddTask";

// importing add task function from addform
export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  // stores all the tasks which we fetch from backend
  const [index, setIndex] = useState(0);
  // stores the current index of current task
  const [loading, setLoading] = useState(true);
  // checks if data is loading or not // true or false
  const [error, setError] = useState("");
// checks if any error message
  useEffect(() => {
    async function loadTasks() {
  // async as it is an asynchronous function
      const url = process.env.NEXT_PUBLIC_API_URL;

      if (!url) 
        {
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
      } 
      catch (error)
       {
        console.error(error);
        //prints what error occured on the console
        setError("Failed to fetch tasks.");
      } 
      finally 
      {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  function next()
   {
    if (index < tasks.length - 1)
      // goes to next index like if 2<4 so 2+1=3 moves to third index if true
       {
      setIndex(index + 1);
    }
  }

  function previous() {
    if (index > 0)
      // goes to previous task if possible as long as index is greater than zero 
  {
      setIndex(index - 1);
    }
  }

  // Loading state
  if (loading)
  {
    // if the loading state is true diplays that tasks are loading
    return <p>Loading tasks</p>;
  }

  // Error state
  if (error) 
  {
    return <p>{error}</p>;
  }

  // Empty state
  if (tasks.length === 0) 
  {   
    // if no length of tasks array means its empty
    return <p>No tasks available.</p>;
  }

  const task = tasks[index];
  // will store the current task on screen from the task array
  //like task = tasks[3] on third index will store task 4 
  // Success state
return (
  <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">

    {/* CURRENT TASK BOX */}
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


    {/* ADD TASK BOX */}
    <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-96 mt-8">

      <h2 className="text-xl font-bold text-center mb-6">
        Add a New Task
      </h2>

      <AddTask />

    </div>


  <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-96 mt-8">
    <h2 className = "text-xl font-bold text-center mb-6">
      Update a task 
      </h2>
    <UpdateTask task={task}/>
  </div>
    </div>
);
}