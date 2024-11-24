import React, { useEffect, useState } from 'react'; // Optional for custom styling
import { FaExclamationCircle, FaCheckCircle, FaInfoCircle } from 'react-icons/fa'; // For icons
import './../../styles/controllers/Notification.css';
const Notification = ({ type, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically close the notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 5000); // 5 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  // Determine the icon and color based on the type
  const getIconAndColor = () => {
    switch (type) {
      case 'error':
        return { icon: <FaExclamationCircle />, color: '#dc3545' };
      case 'success':
        return { icon: <FaCheckCircle />, color: 'green' };
      case 'info':
        return { icon: <FaInfoCircle />, color: 'blue' };
      default:
        return { icon: <FaInfoCircle />, color: 'gray' };
    }
  };

  const { icon, color } = getIconAndColor();

  return (
    <div className="notification-container" style={{ backgroundColor: color }}>
      <div className="notification-content">
        <span className="notification-icon">{icon}</span>
        <span className="notification-message">{message}</span>
        <button className="notification-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default Notification;
