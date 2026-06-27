import { useEffect } from "react";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    // Automatically close the notification after 3 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Dynamic styling based on success or error state
  const getToastStyle = () => {
    const baseStyle = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '12px 24px',
      borderRadius: '6px',
      color: '#fff',
      fontWeight: 'bold',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      transition: 'all 0.3s ease',
      animation: 'slideIn 0.3s ease-out'
    };

    if (type === 'error') {
      return { ...baseStyle, backgroundColor: '#dc3545' };
    }
    return { ...baseStyle, backgroundColor: '#28a745' }; 
  };

  return (
    <div style={getToastStyle()}>
      {message}

      <style>{`
        @keyframes slideIn {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Toast;