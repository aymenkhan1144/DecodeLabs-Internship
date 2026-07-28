Project 2 — Backend API (Users API)
A simple REST API built with Node.js + Express, demonstrating:
RESTful endpoint naming (GET /users, POST /users, not /getUsers)
Input validation (name, email required)
Correct HTTP status codes (200, 201, 400, 404, 500)
JSON request/response handling
Setup
Install Node.js if you don't have it.
Open this folder in VS Code.
In the terminal, run:
Code
Server runs at: http://localhost:3000
Endpoints
Method
Route
Description
GET
/
Health check / API info
GET
/users
Get all users
GET
/users/:id
Get a single user by id
POST
/users
Create a new user
Testing it
You can test with a browser (for GET routes), or with a tool like
Postman / Thunder Client (VS Code extension) / curl for POST.
Get all users:
Code
Get one user:
Code
Create a user (valid):
Code
→ Returns 201 Created
Create a user (invalid — missing email):
Code
→ Returns 400 Bad Request with validation error details
Request a user that doesn't exist:
Code
→ Returns 404 Not Found
Notes
Data is stored in-memory (a plain array), so it resets every time you
restart the server. This is intentional for Project 2 — no database
required yet.
curl example for POST from terminal:
Code