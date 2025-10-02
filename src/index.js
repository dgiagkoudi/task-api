const express = require("express");
const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

// get
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// post
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newTask = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date(),
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// put
app.put("/api/tasks/:id/complete", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  task.completed = true;
  res.json(task);
});

// delete
app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});