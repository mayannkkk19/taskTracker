function TaskItem({ task, onDelete, onEdit, onToggleStatus }) {
  // Dynamic badge coloring based on task status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return { bg: '#d4edda', text: '#155724' };
      case 'In Progress': return { bg: '#fff3cd', text: '#856404' };
      default: return { bg: '#e2e3e5', text: '#383d41' };
    }
  };

  const colors = getStatusColor(task.status);

  return (
    <div style={cardStyle}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h4 style={{ margin: 0, textDecoration: task.status === 'Completed' ? 'line-through' : 'none' }}>
            {task.title}
          </h4>
          <span 
            onClick={() => onToggleStatus(task._id, task.status)}
            style={{ 
              ...badgeStyle, 
              backgroundColor: colors.bg, 
              color: colors.text,
              cursor: 'pointer' 
            }}
            title="Click to cycle status"
          >
            {task.status}
          </span>
        </div>
        {task.description && <p style={descStyle}>{task.description}</p>}
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => onEdit(task)} style={editBtnStyle}>Edit</button>
        <button onClick={() => onDelete(task._id)} style={deleteBtnStyle}>Delete</button>
      </div>
    </div>
  );
}

const cardStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: '#fff',
  padding: '1rem',
  borderRadius: '6px',
  marginBottom: '0.8rem',
  border: '1px solid #eee',
  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
};

const badgeStyle = {
  fontSize: '11px',
  padding: '3px 8px',
  borderRadius: '12px',
  fontWeight: 'bold',
  userSelect: 'none'
};

const descStyle = {
  margin: '5px 0 0 0',
  fontSize: '13px',
  color: '#666'
};

const editBtnStyle = {
  background: '#ffc107',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
};

const deleteBtnStyle = {
  background: '#dc3545',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px'
};

export default TaskItem;