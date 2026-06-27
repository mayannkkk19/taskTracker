import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Toast from './components/Toast';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [toast, setToast] = useState(null);

  // States for Filtering and Sorting
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Memoized Notification Handler
  const showNotification = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // 1. Production-grade data lifecycle fetch directly within the effect body
  useEffect(() => {
    let isMounted = true;

    async function syncTasks() {
      try {
        const response = await fetchTasks();
        if (isMounted) {
          setTasks(response.data);
        }
      } catch (error) {
        console.error("Error loading tasks:", error);
        // Using a functional state trigger to prevent any scope attachment flags
        setToast(() => ({ message: "Failed to fetch tasks from server", type: "error" }));
      }
    }

    syncTasks();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array is perfectly valid and clean now!

  // 2. Extra helper to trigger manual list syncs on mutations without violating effect scopes
  const refreshTasksList = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error refreshing task stream:", error);
    }
  };

  // Compute the visible tasks dynamically using useMemo for optimal performance
  const processedTasks = useMemo(() => {
    let result = [...tasks];
    
    // Filter logic
    if (filterStatus !== 'All') {
      result = result.filter(task => task.status === filterStatus);
    }

    // Sort logic
    if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortBy === 'Oldest') {
      result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    } else if (sortBy === 'Alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [tasks, filterStatus, sortBy]);

  // Handler to add or update a task
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
      refreshTasksList(); 
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
      refreshTasksList();
    } catch (error) {
      console.error("Error updating status:", error);
      showNotification("Failed to switch status", "error");
    }
  };

  // Handler to delete a task
  const handleDeleteTask = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        showNotification("🗑️ Task deleted successfully!", "error");
        refreshTasksList();
      } catch (error) {
        console.error("Error deleting task:", error);
        showNotification("Failed to remove task documentation", "error");
      }
    }
  };

  return (
    <div style={{margin: '0 auto', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Task Tracker</h1>
      
      <TaskForm 
        key={taskToEdit ? taskToEdit._id : 'new-task'}
        onSave={handleSaveTask} 
        taskToEdit={taskToEdit} 
        clearEdit={() => setTaskToEdit(null)} 
      />

      {/* Control Bar UI for Filtering and Sorting */}
      <div style={controlBarStyle}>
        <div>
          <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Filter by Status:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} style={selectStyle}>
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div>
          <label style={{ marginRight: '8px', fontWeight: 'bold' }}>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selectStyle}>
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
            <option value="Alphabetical">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>
      
      <TaskList 
        tasks={processedTasks} 
        onDelete={handleDeleteTask} 
        onEdit={setTaskToEdit} 
        onToggleStatus={handleToggleStatus}
      />

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

// Styles
const controlBarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  background: '#f1f3f5',
  padding: '10px 15px',
  borderRadius: '6px',
  marginBottom: '1rem',
  flexWrap: 'wrap',
  gap: '10px'
};

const selectStyle = {
  padding: '6px 10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  fontSize: '14px',
  cursor: 'pointer',
  color: 'black'
};

export default App;