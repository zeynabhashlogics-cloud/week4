"use client";

import { useState } from "react";

export default function AddTask() 
{
  
  // stores title status and priority values
  const [title, newtitle] = useState("");
  const [priority, newpriority] = useState("");
  const [status, newstatus] = useState("");

  // stores the error messages
  const [titleError, setTitleError] = useState("");
  const [prioError, setPrioError] = useState("");
  const [statusError, setStatError] = useState("");

  // function for when user submits the form
  async function Submit() 
  {
    
    // Inline validatio
    // //title validationn
    if (title.trim() === "") {
      setTitleError("Title is required");
      return;
    }
//priority validation
    if (!["low", "medium", "high"].includes(priority)) {
      setPrioError("Invalid priority");
      return;
    }
// status validation
    if (!["pending", "completed"].includes(status)) {
      setStatError("Invalid status");
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

    

      clearform();
    
    } catch (error) {
      console.log("Task not added", error);
    }
  }

  function clearform() 
  {
    setStatError("");
    setPrioError("");
    setTitleError("");
    newpriority("");
    newtitle("");
    newstatus("");

    // clears form to empty values
  }

  return (
    <div>
      
        <form onSubmit={Submit}>
      
          <h2 className="text-xl font-bold mb-4">Add Task</h2>

          <div>
            <label>Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => {
                newtitle(e.target.value);
                setTitleError("");
              }}
              placeholder="  task title"
            />

            {titleError && <p>{titleError}</p>}
          </div>

          <div>
        

            <select
              value={priority}
              onChange={(e) => {
                newpriority(e.target.value);
                setPrioError("");
              }}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            {prioError && <p>{prioError}</p>}
          </div>

    
          <div>
       
            <select
              value={status}
              onChange={(e) => {
                newstatus(e.target.value);
                setStatError("");
              }}
            >
              <option value="">Select status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            {statusError && <p>{statusError}</p>}
          </div>


          <button type="submit">
            Submit
          </button>

          <button
            type="button"
            onClick={clearform}
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => {
              clearform();
            }}
          >
            Cancel
          </button>
        </form>
      
    </div>
  );
}


