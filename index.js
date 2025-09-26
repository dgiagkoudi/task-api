const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// statikos fakelos gia frontend
app.use(express.static(path.join(__dirname, "public")));

let tasks = [];

// create
app.post("/api/tasks", (req, res) => {
  const task = req.body;
  tasks.push(task);
  res.status(201).json(task);
});

// read all
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// read one
app.get("/api/tasks/:id", (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// update
app.put("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks[index] = req.body;
  res.json(tasks[index]);
});

// delete
app.delete("/api/tasks/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  const deleted = tasks.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
