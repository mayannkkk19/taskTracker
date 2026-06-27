import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit, onToggleStatus }) {
  if (tasks.length === 0) {
    return (
      <div style={emptyStateStyle}>
        <p>📭 No tasks found matching your current filter.</p>
      </div>
    );
  }

  return (
    <div style={listContainerStyle}>
      {tasks.map((task) => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onDelete={onDelete} 
          onEdit={onEdit} 
          onToggleStatus={onToggleStatus} 
        />
      ))}
    </div>
  );
}


const emptyStateStyle = {
  textAlign: 'center',
  padding: '2rem',
  background: '#f8f9fa',
  borderRadius: '8px',
  color: '#6c757d',
  border: '1px dashed #dee2e6',
  marginTop: '1rem',
  fontSize: '16px'
};

const listContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
  marginTop: '1rem'
};

export default TaskList;