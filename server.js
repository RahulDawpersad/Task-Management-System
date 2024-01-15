const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3306;

app.use(express.static('public'));
app.use(bodyParser.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'bs4bfjfdqhcsvsocqpyp-mysql.services.clever-cloud.com',
  user: 'u7vek3bjguekgimo',
  password: 'u7vek3bjguekgimo',
  database: 'bs4bfjfdqhcsvsocqpyp',
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to the database');
  }
});

// Serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// Fetch tasks from the database
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      res.status(500).json({ success: false, message: 'Error fetching tasks' });
    } else {
      res.json(result);
    }
  });
});

// Add a new task to the database
app.post('/tasks', (req, res) => {
  const newTask = req.body.task;
  const sql = 'INSERT INTO tasks (task) VALUES (?)';
  db.query(sql, [newTask], (err, result) => {
    if (err) {
      console.error('Error adding task:', err);
      res.status(500).json({ success: false, message: 'Error adding task' });
    } else {
      res.json({ success: true, message: 'Task added successfully' });
    }
  });
});

// Remove/Delete a task from the database
app.delete('/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.query(sql, [taskId], (err, result) => {
    if (err) {
      console.error('Error removing task:', err);
      res.status(500).json({ success: false, message: 'Error removing task' });
    } else {
      res.json({ success: true, message: 'Task removed successfully' });
    }
  });
});

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
