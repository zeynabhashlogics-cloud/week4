import express from "express";
import tasks from "../data/tasks.js";
const router = express.Router();

// CREATE AND READ USING GET AND POST

//get tasks
router.get("/tasks", (req, res) => 
  {
  res.json(tasks);
  });

//post tasks// add a task
//post tasks// add a task
router.post("/tasks", (req,res)=> {

  const{title,status,priority} = req.body;

//req.body gives ypu object sent by client
//destructuring
//lets you access specific name/title from an object or array


//validating the title
  if (!title || title.trim() ==="")
  {
    return res.status(400).json
    ({
    message:"title is required ",

     }
);
  }

  //validating the priority
   const validpriority = ["low","medium","high"];

 if (!priority || priority.trim()==="")
 {
  return res.status(400).json
  ({
    message : "priority is needed",
  });
 }
 if (!validpriority.includes(priority))
 {
  return res.status(400).json(
    {
      message :"not valid priority",
    }
  );
 }
 
 //validating the status
 const validstatus =["pending","completed"];

 if (!status || status.trim()==="")
 {
  return res.status(400).json(
    {
    message : "status is required ",
    }
  );
 }

 if (!validstatus.includes(status))
 {
  return res.status(400).json(
    {
      message :"not a valid status ",
    }
  );
 }
 // new object to store the new added task
 const newtask =
 {
  id : tasks.length +1,
  status,
  priority,
  title,
 };

 tasks.push(newtask);
//add a new task to end of object / array 
 res.status(201).json({
// 201 success code for new task created
  message : "new task created ",
  task : newtask ,
 });
});

// UPDATE AND DELETE USING PATCH , DELETE AND GET

//read or get one task
router.get("/tasks/:id", (req, res) => {
 
  const id = + req.params.id;
 if (isNaN(id))
 {
  return res.status(400).json({
    message :"not a valid id",
  });

 }
  const task  = tasks.find(task=>task.id===id);
  if (!task)
  {
    return res.status(404).json({
      message :"no id found",
    });
  }
  return res.status(200).json(task);
 }
);

//update one task
router.patch ("/tasks/:id",(req,res)=>
{
const id = + req.params.id;
const {title,status ,priority}=req.body;
if (isNaN(id))
return res.status(400).json({
  message : "not a valid id  ",
});
const index =tasks.findIndex(task=>task.id===id);
if (index<0)
{
  return res.status(404).json({
    message : " no id found ",
  });
}

if (status !== undefined)
{
  tasks[index].status=status;
}
if ( priority!== undefined )
{
  tasks[index].priority= priority;
}
if (title !==undefined)
{
  tasks[index].title=title;
}


return res.status(200).json(tasks[index]);
});
// delete one task
router.delete("/tasks/:id", (req, res) => {
  
  const id = +req.params.id;
  // number check 
  if (isNaN(id))

    return res.status(400).json({
  message : "not a valid id ",
    });

const index = tasks.findIndex(task =>task.id ===id);
  
    if (index<0)
  {
    return res.status(404).json({
      message :"no id found",
    });
  }

  const deleted = tasks.splice(index,1);
  
  res.status(200).json
  ({
    message : "task deleted ",
    task : deleted[0],
  });

  
});


export default router;
