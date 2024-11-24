import React, { useState } from 'react';
import './../../styles/home/AddRecipe.css'; // Import the CSS file
import ConfirmationModal from './../controllers/ConfirmationModal';
import Notification from './../controllers/Notification';

function AddRecipe({ onAddRecipe }) {
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');

  // Error states
  const [recipeNameError, setRecipeNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [ingredientsError, setIngredientsError] = useState('');
  const [ingredientError, setIngredientError] = useState('');

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationType, setNotificationType] = useState('');
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleRecipeNameChange = (e) => {
    const value = e.target.value;
    setRecipeName(value);
    if (value.trim()) {
      setRecipeNameError('');
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (value.trim()) {
      setDescriptionError('');
    }
  };

  const handleIngredientChange = (e) => {
    const value = e.target.value;
    setIngredient(value);
    if (value.trim()) {
      setIngredientError('');
    }
  };

  const addIngredient = () => {
    if (!ingredient.trim()) {
      setIngredientError('Ingredient cannot be empty.');
      return;
    }
    if (ingredients.includes(ingredient.trim())) {
      setIngredientError('Ingredient already added.');
      return;
    }
    setIngredients([...ingredients, ingredient.trim()]);
    setIngredient(''); // Reset ingredient input field
    setIngredientsError(''); // Clear ingredients error if it was set
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    let valid = true;

    if (!recipeName.trim()) {
      setRecipeNameError('Recipe name is required.');
      valid = false;
    }

    if (!description.trim()) {
      setDescriptionError('Description is required.');
      valid = false;
    }

    if (ingredients.length === 0) {
      setIngredientsError('At least one ingredient is required.');
      valid = false;
    }

    return valid;
  };

  const confirmAddRecipe = () => {
    // Close the confirmation modal
    setShowConfirmation(false);

    try {
      const newRecipe = {
        name: recipeName,
        description : description,
        ingredients : ingredients,
      };
  
      // Call onAddRecipe to pass the new recipe back to the parent
      onAddRecipe(newRecipe);
      // Simulate successful addition
      triggerNotification('success', 'Recipe added successfully!');
    } catch (error) {
      console.error('Error adding recipe:', error);
      triggerNotification('error', `Failed to add recipe: ${error.message}`);
    }

    // Clear form fields after submission
    setRecipeName('');
    setDescription('');
    setIngredients([]);
    setIngredient('');
  };

  const triggerNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowConfirmation(true);
  };

  return (
    <div className="add-recipe-container">
      <h2 className="add-recipe-title">Add a New Recipe</h2>

      <div className="form-group">
        <label htmlFor="recipe-name" className="form-label">Recipe Name:</label>
        <input
          type="text"
          id="recipe-name"
          className="form-input"
          value={recipeName}
          onChange={handleRecipeNameChange}
          placeholder="Enter recipe name"
        />
        {recipeNameError && <p className="error-message">{recipeNameError}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea
          id="description"
          className="form-textarea"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter description"
        />
        {descriptionError && <p className="error-message">{descriptionError}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="ingredients" className="form-label">Ingredients:</label>
        <div className="ingredient-input-container">
          <input
            type="text"
            id="ingredients"
            className="form-input"
            value={ingredient}
            onChange={handleIngredientChange}
            placeholder="Enter an ingredient"
          />
          <button className="add-ingredient-button" onClick={addIngredient}>Add Ingredient</button>
        </div>
        {ingredientError && <p className="error-message">{ingredientError}</p>}

        {ingredients.length > 0 && (
          <ul className="ingredient-list">
            {ingredients.map((ing, index) => (
              <li key={index} className="ingredient-item">
                {ing}
                <button className="remove-ingredient-button" onClick={() => removeIngredient(index)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
        {ingredientsError && <p className="error-message">{ingredientsError}</p>}
      </div>

      <div className="add-recipe-save-container">
        <button className="save-recipe-button" onClick={handleSubmit}>Save Recipe</button>
      </div>

      {showConfirmation && (
        <ConfirmationModal
          title="Add a New Recipe"
          message="Are you sure you want to add this recipe?"
          actionType="add"
          onConfirm={confirmAddRecipe}
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

export default AddRecipe;
