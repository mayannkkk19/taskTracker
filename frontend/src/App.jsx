import { useState, useEffect, useCallback, useMemo } from 'react';
import { fetchTasks, createTask, updateTask, deleteTask } from './api/taskApi';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import Toast from './components/Toast';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [toast, setToast] = useState(null);

  const [filterStatus, setFilterStatus] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const showNotification = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function syncTasks() {
      try {
        const response = await fetchTasks();
        if (isMounted) setTasks(response.data);
      } catch (error) {
        console.error("Error loading tasks:", error);
        setToast(() => ({ message: "Failed to fetch tasks from server", type: "error" }));
      }
    }
    syncTasks();
    return () => { isMounted = false; };
  }, []);

  const refreshTasksList = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error refreshing task stream:", error);
    }
  };

  const processedTasks = useMemo(() => {
    let result = [...tasks];
    if (filterStatus !== 'All') {
      result = result.filter(task => task.status === filterStatus);
    }
    if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    } else if (sortBy === 'Oldest') {
      result.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    } else if (sortBy === 'Alphabetical') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }
    return result;
  }, [tasks, filterStatus, sortBy]);

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
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased pb-12">
      {/* Top Glassmorphism Navbar Header */}
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-slate-200/80 mb-8">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <h1 className="text-xl font-bold bg-gradient-to-r align-middle from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              TaskTracker
            </h1>
          </div>
          <div className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
            {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
          </div>
        </div>
      </header>

      {/* Main Workspace layout */}
      <main className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Hand Sticky Column: Creation Form */}
        <section className="md:col-span-1">
          <div className="sticky top-24 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              {taskToEdit ? '✏️ Edit Task' : '✨ Create Task'}
            </h2>
            <TaskForm 
              key={taskToEdit ? taskToEdit._id : 'new-task'}
              onSave={handleSaveTask} 
              taskToEdit={taskToEdit} 
              clearEdit={() => setTaskToEdit(null)} 
            />
          </div>
        </section>

        {/* Right Hand Dynamic Column: Controls & Dynamic List */}
        <section className="md:col-span-2 space-y-6">
          
          {/* Enhanced Control Bar UI */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
            <div className="flex items-center gap-2 flex-1">
              <label className="font-medium text-slate-500 text-xs uppercase tracking-wider whitespace-nowrap">Filter</label>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)} 
                className="w-full sm:w-auto text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium py-1.5 px-3 rounded-lg border border-slate-200 transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="All">All Tasks</option>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center gap-2 flex-1 sm:justify-end">
              <label className="font-medium text-slate-500 text-xs uppercase tracking-wider whitespace-nowrap">Sort</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className="w-full sm:w-auto text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium py-1.5 px-3 rounded-lg border border-slate-200 transition-colors cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="Newest">Newest First</option>
                <option value="Oldest">Oldest First</option>
                <option value="Alphabetical">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>
          
          {/* Interactive Task Stream Container */}
          <TaskList 
            tasks={processedTasks} 
            onDelete={handleDeleteTask} 
            onEdit={setTaskToEdit} 
            onToggleStatus={handleToggleStatus}
          />
        </section>
      </main>

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