import React from 'react';
import './../../styles/home/RecipeCard.css'; // Optional: Add styles for the recipe card
import { FaEdit, FaTrash } from 'react-icons/fa'; 

function RecipeCard({ title, description, onView, onDelete, onUpdate }) {
  // Limit the description to 20 words
  const shortDescription = description.split(' ').slice(0, 20).join(' ') + '...';

  // Handle the update button click to stop event bubbling
  const handleUpdateClick = (event) => {
    event.stopPropagation(); // Prevent the click from propagating to the recipe card
    onUpdate();
  };

  // Handle the delete button click to stop event bubbling
  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Prevent the click from propagating to the recipe card
    onDelete();
  };

  return (
    <div className="recipe-card" onClick={onView}>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{title}</h3>
        <p className="recipe-card-description">{shortDescription}</p>
      </div>
      <div className="recipe-card-actions">
        <button className="recipe-card-button update-btn" onClick={handleUpdateClick}><FaEdit /> Update</button>
        <button className="recipe-card-button delete-btn" onClick={handleDeleteClick}><FaTrash /> Delete</button>
      </div>
    </div>
  );
}

export default RecipeCard;
