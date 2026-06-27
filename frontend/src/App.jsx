import { useState, useEffect } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Define the fetching logic cleanly
  const loadTasks = async (isActive = true) => {
    try {
      const response = await fetchTasks();
      if (isActive) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks(isMounted);
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Handler to add or update a task
  const handleSaveTask = async (taskData) => {
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, taskData);
        setTaskToEdit(null);
      } else {
        await createTask(taskData);
      }
      loadTasks(); 
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  // Handler to change task status directly from the card
  const handleToggleStatus = async (id, currentStatus) => {
    let nextStatus = 'Pending';
    if (currentStatus === 'Pending') nextStatus = 'In Progress';
    else if (currentStatus === 'In Progress') nextStatus = 'Completed';

    try {
      await updateTask(id, { status: nextStatus });
      loadTasks();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handler to delete a task
  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        loadTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Task Tracker</h1>
      
      <TaskForm 
        key={taskToEdit ? taskToEdit._id : 'new-task'}
        onSave={handleSaveTask} 
        taskToEdit={taskToEdit} 
        clearEdit={() => setTaskToEdit(null)} 
      />
      
      <TaskList 
        tasks={tasks} 
        onDelete={handleDeleteTask} 
        onEdit={setTaskToEdit} 
        onToggleStatus={handleToggleStatus}
      />
    </div>
  );
}

export default App;