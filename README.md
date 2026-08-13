
# Task Management CRUD App

A full-stack Task Management CRUD application built with **Next.js, TypeScript, Tailwind CSS and Express.js.

The application allows users to create, view, update, and delete tasks. The backend provides a REST API, while the frontend provides the user interface.


### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* JavaScript
* CORS
* dotenv

### Development Tools

* VS Code
* Git
* npm

## Project Structure

project/
│
├── backend/
│   ├── data/
│   │   └── tasks.js
│   ├── routes/
│   │   └── tasks.js
│   ├── .env
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── frontend/
    └── myapp/
        ├── app/
        │   ├── layout.tsx
        │   └── ...
        ├── components/
        │   ├── AddTask.tsx
        │   ├── UpdateTask.tsx
        │   └── Header.tsx
        ├── types/
        │   └── task.ts
        ├── .env
        ├── .env.example
        ├── .gitignore
        ├── package.json
        └── postcss.config.mjs

# Features

* View tasks
* Create a task
* Update a task
* Delete a task
* Task status validation
* Task priority validation
* Clear success and error messages
* TypeScript strict task types
* Responsive UI with Tailwind CSS
* REST API
* Separate frontend and backend
* Environment variable configuration

# Task Data

Each task contains:

id
title
status
priority


The allowed status values are:

pending
completed

The allowed priority values are:

low
medium
high

# TypeScript Types

The frontend uses strict union types instead of allowing any string.

export type TaskStatus = "pending" | "completed";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
};


This prevents invalid values from being used in TypeScript code.

# Backend Validation

const validPriority = ["low", "medium", "high"];
const validStatus = ["pending", "completed"];

if (
  typeof title !== "string" ||
  typeof status !== "string" ||
  typeof priority !== "string"
) {
  return res.status(400).json({
    message: "Title, status, and priority must be strings.",
  });
}

if (!validPriority.includes(priority)) {
  return res.status(400).json({
    message: "Priority must be low, medium, or high.",
  });
}

if (!validStatus.includes(status)) {
  return res.status(400).json({
    message: "Status must be pending or completed.",
  });
}


# Environment Variables

Environment variables are used to store configuration separately from the source code.

# Security

Actual `.env` files should not be committed to Git.

The following should be included in `.gitignore`:

gitignore
.env
.env.local
node_modules/

The example files can be committed:

.env.example

The example files show developers which variables they need without exposing actual passwords or secrets.


# Backend Setup

Navigate to the backend:

cd backend

Install dependencies:

npm install

Or start the production-style server:

npm start

The backend runs on:


http://localhost:3002

# Frontend Setup

Navigate to the Next.js application:


cd frontend/myapp

Install dependencies:

npm install

Start the development server:

npm run dev


The frontend normally runs on:

http://localhost:3000


If port 3000 is already being used, Next.js may start on another available port.


# API Endpoints

The backend provides the following REST API.

| Method | Endpoint     | Request Body                  | Description   |
| ------ | ------------ | ----------------------------- | ------------- |
| GET    | `/tasks`     | None                          | Get all tasks |
| GET    | `/tasks/:id` | None                          | Get one task  |
| POST   | `/tasks`     | `title`, `status`, `priority` | Create a task |
| PATCH  | `/tasks/:id` | `title`, `status`, `priority` | Update a task |
| DELETE | `/tasks/:id` | None                          | Delete a task |

---

# GET /tasks

Returns all tasks.

### Request

```http
GET /tasks
```

### Example response

```json
[
  {
    "id": 1,
    "title": "Learn PostgreSQL",
    "status": "completed",
    "priority": "high"
  },
  {
    "id": 2,
    "title": "Learn Prisma",
    "status": "pending",
    "priority": "high"
  }
]
```

---

# GET /tasks/:id

Returns one task.

### Request

```http
GET /tasks/1
```

### Example response

```json
{
  "id": 1,
  "title": "Learn PostgreSQL",
  "status": "completed",
  "priority": "high"
}
```

If the task doesn't exist:

```json
{
  "message": "Task with ID 1 was not found."
}
```

---

# POST /tasks

Creates a new task.

### Request

```http
POST /tasks
```

### Request body

```json
{
  "title": "Learn Prisma",
  "status": "pending",
  "priority": "high"
}
```

### Successful response

```json
{
  "message": "Task created successfully.",
  "task": {
    "id": 3,
    "title": "Learn Prisma",
    "status": "pending",
    "priority": "high"
  }
}
```

### Validation

The backend checks that:

* `title` is a string
* `status` is a string
* `priority` is a string
* `status` is either `pending` or `completed`
* `priority` is `low`, `medium`, or `high`
* `title` is not empty

---

# PATCH /tasks/:id

Updates an existing task.

### Request

```http
PATCH /tasks/3
```

### Request body

```json
{
  "title": "Learn Prisma ORM",
  "status": "completed",
  "priority": "high"
}
```

### Successful response

```json
{
  "message": "Task updated successfully.",
  "task": {
    "id": 3,
    "title": "Learn Prisma ORM",
    "status": "completed",
    "priority": "high"
  }
}
```

If the task doesn't exist:

```json
{
  "message": "Task with ID 3 was not found."
}
```

---

# DELETE /tasks/:id

Deletes a task.

### Request

```http
DELETE /tasks/3
```

### Successful response

```json
{
  "message": "Task deleted successfully."
}
```

The frontend can display this message to the user after a successful deletion.

---

# React Task State

The frontend stores tasks using React state.

Example:

```tsx
const [tasks, setTasks] = useState<Task[]>([]);
```

The strict `Task` type ensures that the state contains valid task objects.

---

# Select Inputs and Union Types

HTML select values are returned by the browser as `string`.

For example:

```tsx
onChange={(e) => setPriority(e.target.value)}
```

If the state expects:

```ts
TaskPriority
```

TypeScript may complain because `e.target.value` is typed as `string`.

The value can be narrowed to the union type:

```tsx
onChange={(e) =>
  setPriority(e.target.value as TaskPriority)
}
```

Similarly:

```tsx
onChange={(e) =>
  setStatus(e.target.value as TaskStatus)
}
```

Example:

```tsx
<select
  value={priority}
  onChange={(e) =>
    setPriority(e.target.value as TaskPriority)
  }
>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</select>
```

---

# UpdateTask Component

When displaying the update form, the parent passes the task ID as the React key:

```tsx
<UpdateTask
  key={task.id}
  task={task}
/>
```

This helps React correctly recreate the component when the displayed task changes.

This is especially useful when `UpdateTask` contains its own state.

---

# Semantic HTML

The header navigation is wrapped in a `<nav>` element:

```tsx
<header>
  <nav>
    <Link href="/">Home</Link>
    <Link href="/about">About</Link>
    <Link href="/tasks">Tasks</Link>
  </nav>
</header>
```

The main page content is wrapped in `<main>` inside `layout.tsx`:

```tsx
<body>
  <Header />

  <main>
    {children}
  </main>
</body>
```

These elements improve semantic structure and accessibility.

---

# Button Component

If a reusable `Button.tsx` component is kept, it should support appropriate button properties such as `type` and `disabled`.

Example:

```tsx
type ButtonProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};
```

If the component is not used anywhere in the project, it can be removed instead of keeping unused code.

---

# Tailwind CSS

The frontend uses Tailwind CSS for styling.

Examples:

```tsx
className="bg-blue-600 text-white px-4 py-2 rounded-md"
```

Disabled buttons can use:

```tsx
className="disabled:bg-gray-400"
```

The `postcss.config.mjs` file belongs inside the Next.js application:

```text
frontend/myapp/postcss.config.mjs
```

---

# Error Handling

The backend returns meaningful HTTP status codes and messages.

Examples:

### Bad request

```json
{
  "message": "Priority must be low, medium, or high."
}
```

Status:

```text
400 Bad Request
```

### Not found

```json
{
  "message": "Task with ID 10 was not found."
}
```

Status:

```text
404 Not Found
```

### Successful deletion

```json
{
  "message": "Task deleted successfully."
}
```

Status:

```text
200 OK
```

Clear messages allow the frontend to display useful feedback instead of vague messages such as `"error"`.

---

# Running the Complete Project

# Project Architecture

The final architecture is:

                    ┌──────────────────┐
                    │   Next.js UI     │
                    │   TypeScript     │
                    └────────┬─────────┘
                             │
                             │ HTTP
                             ▼
                    ┌──────────────────┐
                    │  Express API     │
                    │   Validation     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Prisma       │
                    │  Prisma Client   │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   PostgreSQL     │
                    │   task database  │
                    └──────────────────┘

