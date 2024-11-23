import React from "react";
import "./../../styles/controllers/Popup.css";

const Popup = ({ onClose, children }) => {
  return (
    <div className="overlay">
      <div className="popup">
        <div className="popup-container-up">
            <button className="closeButton" onClick={onClose}>
            X
            </button>
        </div>
        <div className="popup-container-down">
            {children}
        </div>



      </div>
    </div>
  );
};

export default Popup;
