const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middlewares/auth');
const { body, validationResult } = require('express-validator');

// Create a new task
router.post('/', authMiddleware, [
  body('title').notEmpty().trim().escape(),
  body('description').notEmpty().trim().escape(),
  body('dueDate').notEmpty().isISO8601(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const taskData = req.body;
    // Validate and sanitize the taskData here

    const task = await Task.create(taskData);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.id;
    const taskData = req.body;
    // Validate and sanitize the taskData here
    const updatedTask = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
