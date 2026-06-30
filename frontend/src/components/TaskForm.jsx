import { useState } from 'react';

function TaskForm({ onSave, taskToEdit, clearEdit }) {
  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : '');
  const [description, setDescription] = useState(taskToEdit ? (taskToEdit.description || '') : '');
  const [status, setStatus] = useState(taskToEdit ? (taskToEdit.status || 'Pending') : 'Pending');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation
    if (!title.trim()) {
      alert('Please enter a task title');
      return;
    }

    // Pass data up to App.jsx
    onSave({ title, description, status });
    
    // Clear local inputs if it was a new task creation
    if (!taskToEdit) {
      setTitle('');
      setDescription('');
      setStatus('Pending');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
      {/* Title Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Task Title <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-slate-55 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 transition-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
      </div>

      {/* Description Input */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Description
        </label>
        <textarea
          placeholder="Add some details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full h-20 px-3 py-2 bg-slate-55 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 resize-none transition-all focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        />
      </div>

      {/* Status Selection */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
          Initial Status
        </label>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          className="w-full px-3 py-2 bg-slate-55 border border-slate-200 rounded-lg text-sm text-slate-700 font-medium transition-all cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <button 
          type="submit" 
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-sm shadow-xs hover:shadow-sm active:scale-[0.98] transition-all duration-150 cursor-pointer"
        >
          {taskToEdit ? 'Update Task' : 'Add Task'}
        </button>
        
        {taskToEdit && (
          <button 
            type="button" 
            onClick={clearEdit} 
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium rounded-lg text-sm transition-colors cursor-pointer"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;