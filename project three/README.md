# Project 3 — Database Integration

A REST API backed by a real, persistent SQLite database, with full CRUD operations and protection against SQL injection. Built for the DecodeLabs Full Stack Development Internship (2026 batch).

## Features

- **Real persistent storage** using SQLite (via Node's built-in `node:sqlite` module — no external database server needed)
- **Schema design** with proper constraints: `NOT NULL`, `UNIQUE` (on email), `DEFAULT` values, auto-incrementing primary key
- **Full CRUD** — Create (`POST`), Read (`GET` all + single), Update (`PUT`), Delete (`DELETE`)
- **SQL injection protection** via parameterized queries — user input is always passed as data, never concatenated into raw SQL
- Data integrity enforced at the database level (e.g. duplicate emails rejected by the database itself, not just application code)

## Tech Stack

Node.js, Express, SQLite (`node:sqlite`)

## How to Run
Server runs at `http://localhost:3000`. A file called `app.db` will be created automatically — this is your actual database.

## Endpoints

| Method | Route         | Description                |
|--------|---------------|-----------------------------|
| GET    | `/`           | Health check / API info    |
| GET    | `/users`      | Read all users              |
| GET    | `/users/:id`  | Read a single user           |
| POST   | `/users`      | Create a new user            |
| PUT    | `/users/:id`  | Update an existing user       |
| DELETE | `/users/:id`  | Delete a user                 |

## Why SQLite over an in-memory array (Project 2)?

Project 2's data lived only in memory and vanished on every restart. Here, data is written to a real database file on disk (`app.db`), so it survives server restarts — the core requirement of "database integration."
