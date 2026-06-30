function TaskItem({ task, onDelete, onEdit, onToggleStatus }) {
  // Dynamic badge color mappings based on task status using modern Tailwind palettes
  const getStatusClasses = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100';
      case 'In Progress':
        return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100';
      default: // Pending
        return 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100';
    }
  };

  return (
    <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-200">
      
      {/* Content Side */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h4 className={`text-base font-semibold text-slate-800 truncate transition-all ${
            task.status === 'Completed' ? 'line-through text-slate-400 font-normal' : ''
          }`}>
            {task.title}
          </h4>
          
          <span 
            onClick={() => onToggleStatus(task._id, task.status)}
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border select-none transition-colors duration-150 cursor-pointer ${getStatusClasses(task.status)}`}
            title="Click to cycle status"
          >
            {task.status}
          </span>
        </div>
        
        {task.description && (
          <p className="mt-1 text-sm text-slate-500 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button 
          onClick={() => onEdit(task)} 
          className="text-xs font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg border border-indigo-100 transition-colors cursor-pointer"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task._id)} 
          className="text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-lg border border-rose-100 transition-colors cursor-pointer"
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default TaskItem;