import React from "react";
import "./../../styles/controllers/Popup.css";

const Popup = ({ onClose, children }) => {
  return (
    <div className="overlay">
      <div className="popup">
        <button className="closeButton" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
