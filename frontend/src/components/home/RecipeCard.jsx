import React from 'react';
import './../../styles/home/RecipeCard.css'; // Optional: Add styles for the recipe card

function RecipeCard({ title, description, onClick, onDelete, onUpdate }) {
  // Limit the description to 20 words
  const shortDescription = description.split(' ').slice(0, 20).join(' ') + '...';

  return (
    <div className="recipe-card" onClick={onClick}>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{title}</h3>
        <p className="recipe-card-description">{shortDescription}</p>
      </div>
      <div className="recipe-card-actions">
        <button className="recipe-card-button update-btn" onClick={onUpdate}>Update</button>
        <button className="recipe-card-button delete-btn" onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}

export default RecipeCard;
