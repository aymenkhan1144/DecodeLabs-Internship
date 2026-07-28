const express = require('express');
const app = express();
const PORT = 3000;


app.use(express.json()); 


let users = [
  { id: 1, name: 'Aditi Sharma', email: 'aditi@example.com', role: 'admin' },
  { id: 2, name: 'Rahul Verma', email: 'rahul@example.com', role: 'user' }
];
let nextId = 3;


function findUserById(id) {
  return users.find(u => u.id === Number(id));
}


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
    message: 'Project 2 API is running.',
    endpoints: {
      'GET /users': 'Get all users',
      'GET /users/:id': 'Get a single user by id',
      'POST /users': 'Create a new user'
    }
  });
});


app.get('/users', (req, res) => {
  res.status(200).json({
    count: users.length,
    data: users
  });
});


app.get('/users/:id', (req, res) => {
  const user = findUserById(req.params.id);

  if (!user) {
    return res.status(404).json({
      error: 'Not Found',
      message: `No user found with id ${req.params.id}`
    });
  }

  res.status(200).json({ data: user });
});


app.post('/users', (req, res) => {
  const errors = validateUserInput(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Bad Request',
      message: 'Validation failed.',
      details: errors
    });
  }

  const newUser = {
    id: nextId++,
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    role: req.body.role || 'user' 
  };

  users.push(newUser);

  res.status(201).json({
    message: 'User created successfully.',
    data: newUser
  });
});


app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.originalUrl} does not exist.`
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server.'
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});