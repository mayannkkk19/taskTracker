import { useEffect, useState } from "react";

function Toast({ message, type, onClose }) {
  // Local state to control the slide/fade animation transition trigger
  const [isMounted, setIsMounted] = useState(false);

  // 1. Move handleClose out here so the entire component (including the JSX) can see it
  const handleClose = () => {
    setIsMounted(false);
    setTimeout(() => {
      onClose();
    }, 300); // Matches the duration-300 transition time
  };

  useEffect(() => {
    // Trigger the entry animation immediately after component mounts
    const animationFrame = requestAnimationFrame(() => {
      setIsMounted(true);
    });

    // Automatically close the notification after 3 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);

    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [onClose]); // eslint-disable-line react-hooks/exhaustive-deps

  const getToastClasses = () => {
    if (type === 'error') {
      return 'bg-rose-900 border-rose-800 text-rose-50 shadow-rose-950/10';
    }
    return 'bg-emerald-900 border-emerald-800 text-emerald-50 shadow-emerald-950/10';
  };

  return (
    <div 
      className={`fixed bottom-5 right-5 z-50 flex items-center justify-between gap-4 px-4 py-3 rounded-xl border font-medium text-sm shadow-xl cursor-default
        transition-all duration-300 ease-out transform
        ${isMounted 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-12 opacity-0 scale-95'
        } 
        ${getToastClasses()}`}
    >
      
      {/* Toast Content Message Area */}
      <div className="flex items-center gap-2">
        <span className={`inline-block ${isMounted ? 'animate-bounce' : ''}`}>
          {type === 'error' ? '⚠️' : '✨'}
        </span>
        <p>{message}</p>
      </div>

      {/* Manual Instant Dismiss Control Button */}
      <button 
        onClick={handleClose} 
        className="text-xs opacity-60 hover:opacity-100 px-1.5 py-0.5 rounded-md hover:bg-white/10 transition-all duration-150 cursor-pointer"
        aria-label="Close notification"
      >
        ✕
      </button>

    </div>
  );
}

export default Toast;