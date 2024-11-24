import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import './../../styles/home/RecipeContainer.css';
import ConfirmationModal from './../controllers/ConfirmationModal';
import Notification from './../controllers/Notification';

function RecipeContainer({ recipes, setRecipes, onConfirmDelete, onNotify }) {
  const navigate = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const handleUpdateClick = (_id) => {
    navigate(`/edit-recipe/${_id}`);
  };

  const handleViewClick = (_id) => {
    navigate(`/view-recipe/${_id}`);
  };

  const handleDeleteClick = (_id) => {
    setRecipeToDelete(_id);
    setShowConfirmation(true);
  };

  return (
    <div className="recipe-container-main">
      <h1 className="view-recipe-title">Recipes</h1>
      <div className="recipe-container">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe._id}
              title={recipe.name}
              description={recipe.description}
              onView={() => handleViewClick(recipe._id)}
              onUpdate={() => handleUpdateClick(recipe._id)}
              onDelete={() => handleDeleteClick(recipe._id)}
            />
          ))
        ) : (
          <p>No recipes available</p>
        )}
      </div>
      {showConfirmation && (
        <ConfirmationModal
          title="Delete Recipe"
          message="Are you sure you want to delete this recipe?"
          actionType="delete"
          onConfirm={() => {
            onConfirmDelete(recipeToDelete);
            setShowConfirmation(false);
          }}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
    </div>
  );
}

export default RecipeContainer;
