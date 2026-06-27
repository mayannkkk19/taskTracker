import { useState, useEffect, useCallback } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Toast from './components/Toast';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [toast, setToast] = useState(null);

  const showNotification = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Fetch task from backend
  const loadTasks = useCallback(async (isActive = true) => {
    try {
      const response = await fetchTasks();
      if (isActive) {
        setTasks(response.data);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
      showNotification("Failed to fetch tasks from server", "error");
    }
  }, [showNotification]);

  useEffect(() => {
    let isMounted = true;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks(isMounted);
    
    return () => {
      isMounted = false;
    };
  }, [loadTasks]);

  // Add or update task
  const handleSaveTask = async (taskData) => {
    try {
      if (taskToEdit) {
        await updateTask(taskToEdit._id, taskData);
        setTaskToEdit(null);
        showNotification("📝 Task updated successfully!");
      } else {
        await createTask(taskData);
        showNotification("➕ New task added successfully!");
      }
      loadTasks(); 
    } catch (error) {
      console.error("Error saving task:", error);
      showNotification("Error saving task details", "error");
    }
  };

  // Handler to change task status directly from the card
  const handleToggleStatus = async (id, currentStatus) => {
    let nextStatus = 'Pending';
    if (currentStatus === 'Pending') nextStatus = 'In Progress';
    else if (currentStatus === 'In Progress') nextStatus = 'Completed';

    try {
      await updateTask(id, { status: nextStatus });
      showNotification(`Status updated to: ${nextStatus}`);
      loadTasks();
    } catch (error) {
      console.error("Error updating status:", error);
      showNotification("Failed to switch status status", "error");
    }
  };

  // Handler to delete a task
  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        showNotification("🗑️ Task deleted successfully!", "error");
        loadTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
        showNotification("Failed to remove task documentation", "error");
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

      {/* Render notification dynamic layer safely at the root layout */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}

export default App;