const express = require('express');
const db = require('./db');

const app = express();
const PORT = 3000;

app.use(express.json());

function validateUserInput(body) {
  const errors = [];
  if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
    errors.push('name is required and must be a non-empty string.');
  }
  if (!body.email || typeof body.email !== 'string' || !body.email.includes('@')) {
    errors.push('email is required and must be a valid email address.');
  }
  return errors;
}



app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Project 3 API is running (SQLite-backed).',
    endpoints: {
      'GET /users': 'Read all users',
      'GET /users/:id': 'Read a single user',
      'POST /users': 'Create a new user',
      'PUT /users/:id': 'Update an existing user',
      'DELETE /users/:id': 'Delete a user'
    }
  });
});


app.post('/users', (req, res) => {
  const errors = validateUserInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Bad Request', message: 'Validation failed.', details: errors });
  }

  const { name, email } = req.body;
  const role = req.body.role || 'user';

  try {
   
    const stmt = db.prepare('INSERT INTO users (name, email, role) VALUES (?, ?, ?)');
    const result = stmt.run(name.trim(), email.trim(), role);

    const newUser = db.prepare('SELECT * FROM users WHERE id = ?').get(result.lastInsertRowid);

    res.status(201).json({ message: 'User created successfully.', data: newUser });
  } catch (err) {
   
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Bad Request', message: 'That email is already registered.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: 'Could not create user.' });
  }
});


app.get('/users', (req, res) => {
  const users = db.prepare('SELECT * FROM users').all();
  res.status(200).json({ count: users.length, data: users });
});


app.get('/users/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);

  if (!user) {
    return res.status(404).json({ error: 'Not Found', message: `No user found with id ${req.params.id}` });
  }
  res.status(200).json({ data: user });
});


app.put('/users/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Not Found', message: `No user found with id ${req.params.id}` });
  }

  const errors = validateUserInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'Bad Request', message: 'Validation failed.', details: errors });
  }

  const { name, email } = req.body;
  const role = req.body.role || existing.role;

  try {
    db.prepare('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?')
      .run(name.trim(), email.trim(), role, req.params.id);

    const updatedUser = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
    res.status(200).json({ message: 'User updated successfully.', data: updatedUser });
  } catch (err) {
    if (err.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Bad Request', message: 'That email is already registered.' });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error', message: 'Could not update user.' });
  }
});


app.delete('/users/:id', (req, res) => {
  const existing = db.prepare('SELECT * FROM users WHERE id = ?').get(req.params.id);
  if (!existing) {
    return res.status(404).json({ error: 'Not Found', message: `No user found with id ${req.params.id}` });
  }

  db.prepare('DELETE FROM users WHERE id = ?').run(req.params.id);
  res.status(200).json({ message: `User ${req.params.id} deleted successfully.` });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: `Route ${req.method} ${req.originalUrl} does not exist.` });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Database file: app.db (created automatically in this folder)`);
});