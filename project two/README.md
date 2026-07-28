# Project 2 — Backend API Development

A REST API built with Node.js and Express, demonstrating core backend fundamentals: routing, input validation, and correct HTTP status codes. Built for the DecodeLabs Full Stack Development Internship (2026 batch).

## Features

- RESTful endpoint design (`GET /users`, `POST /users`, `GET /users/:id`) — resources as nouns, HTTP methods as verbs
- Server-side input validation — rejects missing/invalid fields with a `400` and a clear error message
- Correct HTTP status code usage: `200` (success), `201` (created), `400` (bad request), `404` (not found), `500` (server error)
- JSON request/response handling via Express middleware

## Tech Stack

Node.js, Express

## How to Run
Server runs at `http://localhost:3000`.

## Note on Data Storage

Data is stored in-memory (a plain JavaScript array), which means it resets every time the server restarts. This was intentional for Project 2, which focused on API logic — persistent storage was addressed in Project 3.

## Endpoints

| Method | Route         | Description              |
|--------|---------------|--------------------------|
| GET    | `/`           | Health check / API info  |
| GET    | `/users`      | Get all users            |
| GET    | `/users/:id`  | Get a single user by id  |
| POST   | `/users`      | Create a new user        |
