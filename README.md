
## Project Summary

This project is a full-stack Task Manager application built to practice modern web development concepts using Next.js and Express.js.

## Features

- View all tasks
- View a single task by ID (/tasks/:id)
- Navigate between tasks using Previous and Next buttons
- Health check endpoint
- Error handling for invalid and missing tasks
- Environment variables
- CORS enabled for frontend-backend communication

## Frontend
- Next.js 
- React 
- TypeScript
- Tailwind CSS

## Backend
- Node.js
- Express.js
- JavaScript (ES Modules)
dotenv
CORS


## API Endpoints

| Method | URL | Body | Response |

|---|---|---|---|
| GET | `/tasks` | None | Returns all tasks |
| GET | `/tasks/:id` | None | Returns a single task |
| POST | `/tasks` | `{ "title", "status", "priority" }` | Creates a new task |
| PATCH | `/tasks/:id` | `{ "title", "status", "priority" }` | Updates an existing task |
| DELETE | `/tasks/:id` | None | Deletes a task |
