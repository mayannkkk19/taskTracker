const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Public
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).sort({ createdAt: -1 }); // Newest tasks first
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not fetch tasks', error: error.message });
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Public
const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;

    // Basic backend validation
    if (!title) {
      return res.status(400).json({ message: 'Please provide a task title' });
    }

    const newTask = await Task.create({
      title,
      description,
      status,
      dueDate
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not create task', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Public
const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Update fields if provided, otherwise keep existing
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not update task', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Public
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Task removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not delete task', error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};