import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit, onToggleStatus }) {
  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>
        🎉 No tasks found! Add one above to get started.
      </div>
    );
  }

  return (
    <div style={{ marginTop: '1.5rem' }}>
      <h3>Your Tasks ({tasks.length})</h3>
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

export default TaskList;