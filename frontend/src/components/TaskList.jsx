import TaskItem from './TaskItem';

function TaskList({ tasks, onDelete, onEdit, onToggleStatus }) {
  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-12 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl mt-4">
        <span className="text-3xl mb-2">📭</span>
        <p className="text-base font-medium text-slate-500">
          No tasks found matching your current filter.
        </p>
        <p className="text-xs text-slate-400 mt-1">
          Try switching status views or create a brand new task item to populate the stream!
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 mt-4">
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