
# Task Management Application

A full-stack task management app built with **Next.js, Express.js, PostgreSQL, Prisma, TypeScript, and Tailwind CSS**.

## Features

* User registration and login
* Password hashing with **bcrypt**
* JWT-based authentication
* Protected task routes
* User-specific tasks
* Create, read, update, and delete tasks
* Task validation
* Email normalization using `trim()` and `toLowerCase()`
* Logout functionality
* JWT stored in `localStorage`
* Prisma ORM with PostgreSQL
* Seed data for testing
* `.env.example` without real secrets

## Authentication Flow

```text
Register
   ↓
Validate user
   ↓
Hash password with bcrypt
   ↓
Store user in PostgreSQL

Login
   ↓
Verify password
   ↓
Generate JWT
   ↓
Store token in localStorage
   ↓
Access protected tasks
```

## Task Authorization

Each task has a `userId`.

```text
User
 ├── Task
 ├── Task
 └── Task
```

The backend uses the authenticated user's ID (`req.user.id`) so users can only access and modify their own tasks.

## API Endpoints

| Method    | Endpoint         | Purpose          |
| --------- | ---------------- | ---------------- |
| POST      | `/auth/register` | Register         |
| POST      | `/auth/login`    | Login            |
| GET       | `/tasks`         | Get user's tasks |
| POST      | `/tasks`         | Create task      |
| GET       | `/tasks/:id`     | Get task by ID   |
| PUT/PATCH | `/tasks/:id`     | Update task      |
| DELETE    | `/tasks/:id`     | Delete task      |

## Tech Stack

**Frontend:** Next.js, React, TypeScript, Tailwind CSS
**Backend:** Node.js, Express.js, TypeScript, JWT, bcrypt
**Database:** PostgreSQL + Prisma
