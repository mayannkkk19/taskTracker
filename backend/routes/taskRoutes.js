const express = require('express');
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// Route for getting all tasks and creating a task
router.route('/')
  .get(getTasks)
  .post(createTask);

// Route for updating and deleting a specific task by ID
router.route('/:id')
  .put(updateTask)
  .delete(deleteTask);

module.exports = router;