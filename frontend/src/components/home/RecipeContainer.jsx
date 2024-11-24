import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import './../../styles/home/RecipeContainer.css';
import ConfirmationModal from './../controllers/ConfirmationModal';
import Notification from './../controllers/Notification';

function RecipeContainer({ recipes, setRecipes }) {
  const navigate = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const confirmDelete = () => {
    setShowConfirmation(false);

    if (recipeToDelete !== null) {
      try {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe.id !== recipeToDelete)
        );
        triggerNotification('success', 'Recipe deleted successfully!');
        setRecipeToDelete(null);
      } catch (error) {
        console.error('Error deleting recipe:', error);
        triggerNotification('error', `Failed to delete recipe: ${error.message}`);
      }
    }
  };

  const triggerNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const handleUpdateClick = (id) => {
    navigate(`/edit-recipe/${id}`);
  };

  const handleViewClick = (id) => {
    navigate(`/view-recipe/${id}`);
  };

  const handleDeleteClick = (id) => {
    setRecipeToDelete(id);
    setShowConfirmation(true);
  };

  return (
    <div className="recipe-container-main">
      <h1 className="view-recipe-title">Recipes</h1>
      <div className="recipe-container">
        {recipes && recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.name}
              description={recipe.description}
              onView={() => handleViewClick(recipe.id)}
              onUpdate={() => handleUpdateClick(recipe.id)}
              onDelete={() => handleDeleteClick(recipe.id)}
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
          onConfirm={confirmDelete}
          onCancel={() => setShowConfirmation(false)}
        />
      )}

      {showNotification && (
        <Notification
          type={notificationType}
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
}

export default RecipeContainer;
