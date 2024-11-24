import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import './../styles/EditRecipe.css';
import ConfirmationModal from './../components/controllers/ConfirmationModal';
import Notification from './../components/controllers/Notification';

function EditRecipe() {
  const { id } = useParams(); // Extract the recipe ID from the route
  const navigate = useNavigate(); // Initialize useNavigate hook

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

  // Handle input changes with real-time error clearing
  const handleRecipeNameChange = (e) => {
    const value = e.target.value;
    setRecipeName(value);
    if (value.trim()) setRecipeNameError('');
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (value.trim()) setDescriptionError('');
  };

  const handleIngredientChange = (e) => {
    const value = e.target.value;
    setIngredient(value);
    if (value.trim()) setIngredientError('');
  };

  // Add new ingredient
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

  // Remove an ingredient
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Validate form before submission
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

  // Simulate fetching the existing recipe by ID on mount
  useEffect(() => {
    const mockRecipes = [
      { id: 1, name: 'Spaghetti Bolognese', description: 'Classic Italian dish.', ingredients: ['Spaghetti', 'Tomato Sauce'] },
      { id: 2, name: 'Chicken Curry', description: 'Spicy curry.', ingredients: ['Chicken', 'Turmeric'] },
      { id: 3, name: 'Vegetarian Pizza', description: 'Healthy pizza.', ingredients: ['Bell Peppers', 'Cheese'] },
    ];

    const recipe = mockRecipes.find((r) => r.id === parseInt(id, 10));
    if (recipe) {
      setRecipeName(recipe.name);
      setDescription(recipe.description);
      setIngredients(recipe.ingredients);
    }
  }, [id]);

  const confirmUpdateRecipe = () => {
    // Close the confirmation modal
    setShowConfirmation(false);

    try {

      const updatedRecipe = {
        id: parseInt(id, 10),
        name: recipeName,
        description:description ,
        ingredients: ingredients,
      };

      // Simulate successful addition
      triggerNotification('success', 'Recipe Updated successfully!');
    } catch (error) {
      console.error('Error Updating recipe:', error);
      triggerNotification('error', `Failed to Updating recipe: ${error.message}`);
    }
    setTimeout(() => {
      navigate(`/`);
    }, 1000);

     
  };

  const triggerNotification = (type, message) => {
    setNotificationType(type);
    setNotificationMessage(message);
    setShowNotification(true);
  };

  // Update recipe handler
  const handleUpdate = () => {
    if (!validateForm()) return;
    setShowConfirmation(true);
  };

  return (
    <section className="edit-recipe-container-main">
      <div className="edit-recipe-controll-container">
        <button className="back-button" onClick={() => navigate(`/`)}>
          <MdArrowBack />
          <span>Back</span>
        </button>
      </div>

      <div className="edit-recipe-container">
        <h2 className="edit-recipe-title">Edit Recipe</h2>

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

        <div className="edit-recipe-save-container">
          <button className="save-recipe-button" onClick={handleUpdate}>Update Recipe</button>
        </div>
      </div>

      {showConfirmation && (
        <ConfirmationModal
          title="Update the Recipe"
          message="Are you sure you want to Update this recipe?"
          actionType="update"
          onConfirm={confirmUpdateRecipe}
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

    </section>
  );
}

export default EditRecipe;
