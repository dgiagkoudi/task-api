const prisma = require("../models/prismaClient");

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title } = req.body;
    
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    if (title.length > 100) {
      return res.status(400).json({ error: "Title is too long" });
    }

    const task = await prisma.task.create({ data: { title, completed: false } });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }
    if (title.length > 100) {
      return res.status(400).json({ error: "Title cannot exceed 100 characters" });
    }
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "Completed must be boolean" });
    }

    const updated = await prisma.task.update({ where: { id }, data: { title, completed } });
    res.json(updated);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Task not found' });
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await prisma.task.delete({ where: { id } });
    res.status(204).end();
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Task not found' });
    next(err);
  }
};
