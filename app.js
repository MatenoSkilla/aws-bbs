require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const port = 3000;

app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

app.get('/posts', async (req, res) => {
  const conn = await mysql.createConnection(dbConfig);
  const [rows] = await conn.execute('SELECT * FROM posts ORDER BY created_at DESC');
  await conn.end();
  res.json(rows);
});

app.post('/posts', async (req, res) => {
  const { title, content } = req.body;
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute('INSERT INTO posts (title, content) VALUES (?, ?)', [title, content]);
  await conn.end();
  res.sendStatus(201);
});

app.delete('/posts/:id', async (req, res) => {
  const conn = await mysql.createConnection(dbConfig);
  await conn.execute('DELETE FROM posts WHERE id = ?', [req.params.id]);
  await conn.end();
  res.sendStatus(204);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
