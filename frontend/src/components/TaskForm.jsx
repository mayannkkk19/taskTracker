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
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3>{taskToEdit ? '📝 Edit Task' : '➕ Add New Task'}</h3>
      
      <div style={inputGroupStyle}>
        <label>Task Title *</label>
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
      </div>

      <div style={inputGroupStyle}>
        <label>Description</label>
        <textarea
          placeholder="Add some details..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...inputStyle, height: '60px', resize: 'none' }}
        />
      </div>

      <div style={inputGroupStyle}>
        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle}>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
        <button type="submit" style={submitButtonStyle}>
          {taskToEdit ? 'Update Task' : 'Add Task'}
        </button>
        {taskToEdit && (
          <button type="button" onClick={clearEdit} style={cancelButtonStyle}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

// Basic inline styles
const formStyle = {
  background: '#f9f9f9',
  padding: '1.5rem',
  borderRadius: '8px',
  marginBottom: '2rem',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
};

const inputGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '1rem',
  gap: '5px'
};

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '14px'
};

const submitButtonStyle = {
  background: '#007bff',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

const cancelButtonStyle = {
  background: '#6c757d',
  color: 'white',
  border: 'none',
  padding: '10px 15px',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default TaskForm;