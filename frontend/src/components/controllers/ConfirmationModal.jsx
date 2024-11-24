import React from 'react';
import './../../styles/controllers/ConfirmationModal.css';

// Functional component for rendering a confirmation modal
const ConfirmationModal = ({ title, message, actionType, onConfirm, onCancel }) => {
  // Determine button color based on action type
  const getButtonColor = () => {
    switch (actionType) {
      case 'delete':
        return '#dc3545';
      case 'add':
      case 'update':
        return '#0855ca';
      default:
        return 'gray'; // default fallback
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onCancel}>×</button>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button
            className="confirm-btn"
            style={{ backgroundColor: getButtonColor() }}
            onClick={onConfirm}
          >
            {actionType === 'delete' ? 'Delete' : 'Yes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
