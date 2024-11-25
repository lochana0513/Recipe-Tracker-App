import React from 'react'
import './../../styles/controllers/Loading.css';
function Loading() {
  return (
    <div className="loading-container">
      <svg viewBox="25 25 50 50" className="load-container">
        <circle cx="50" cy="50" r="20" className="loader"></circle>
      </svg>
    </div>
  )
}

export default Loading