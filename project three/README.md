Project 3 — Database Integration (SQLite)
A REST API backed by a real, persistent SQLite database — data now
survives server restarts, unlike Project 2's in-memory array.
What's different from Project 2

Project 2
Project 3
Storage
JavaScript array (memory)
SQLite file (app.db) on disk
Survives restart?
No — resets every time
Yes — permanent
Duplicate emails?
Not prevented
Blocked by UNIQUE constraint
SQL injection risk?
N/A (no SQL)
Prevented via parameterized queries
Operations
GET, POST
GET, POST, PUT, DELETE (full CRUD)
Setup
Open this folder in VS Code.
In the terminal:
Code
You should see:
Code
A new file called app.db will appear in this folder — that's your
actual database.
If npm install fails on better-sqlite3 (it sometimes needs to
compile native code on install): this usually still works out of the
box on Windows with a recent Node version, but if you hit an error,
send me the terminal output and we'll sort it out — this is a known
occasional hiccup with native Node modules, not something wrong with
your code.
Testing with Thunder Client
Create a user (POST):
Code
→ 201 Created
Try creating the same email again:
Code
→ 400 Bad Request — "That email is already registered." (this is
the database's UNIQUE constraint doing its job)
Read all users (GET, works in a browser tab too):
Code
Read one user:
Code
Update a user (PUT):
Code
→ 200 OK with the updated row
Delete a user (DELETE):
Code
→ 200 OK confirming deletion
Prove persistence: stop the server (Ctrl+C in the terminal), run
npm start again, then GET /users — your data is still there. This
is the entire point of Project 3 vs Project 2.
Why parameterized queries matter (SQL Injection)
Look at this line in server.js:
Js
The ? marks are placeholders. The actual values are passed
SEPARATELY as arguments, never pasted directly into the query text.
This means even if someone submits a malicious string as their
"name" (like '; DROP TABLE users; --), the database treats it as
a harmless piece of text data — never as a command to execute. This
is the exact defense your Project 3 slides described as "Neutralizing
Attacks with Parameterized Queries."