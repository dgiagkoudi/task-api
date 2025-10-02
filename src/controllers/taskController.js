let tasks = [];
let nextId = 1;

exports.getTasks = (req, res) => {
  res.json(tasks.sort((a, b) => b.createdAt - a.createdAt));
};

exports.getTask = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
};

exports.createTask = (req, res) => {
  const { title } = req.body;
  if (!title || title.trim() === "") return res.status(400).json({ error: "Title is required" });
  if (title.length > 100) return res.status(400).json({ error: "Title is too long" });

  const task = { id: nextId++, title, completed: false, createdAt: new Date() };
  tasks.push(task);
  res.status(201).json(task);
};

exports.updateTask = (req, res) => {
  const id = Number(req.params.id);
  const { title, completed } = req.body;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });

  if (title) task.title = title;
  if (typeof completed === "boolean") task.completed = completed;

  res.json(task);
};

exports.completeTask = (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.completed = true;
  res.json(task);
};

exports.deleteTask = (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  tasks.splice(index, 1);
  res.status(204).end();
};
