import React, { useState } from 'react';
import './../../styles/home/AddRecipe.css'; // Import the CSS file
import ConfirmationModal from './../controllers/ConfirmationModal';

function AddRecipe({ onAddRecipe, onNotify }) {
  // State hooks for managing form data
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');

  // Error state hooks for form validation
  const [recipeNameError, setRecipeNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [ingredientsError, setIngredientsError] = useState('');
  const [ingredientError, setIngredientError] = useState('');

  // State for showing/hiding the confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Handle changes in the recipe name input
  const handleRecipeNameChange = (e) => {
    const value = e.target.value;
    setRecipeName(value);
    if (value.trim()) {
      setRecipeNameError('');
    }
  };

   // Handle changes in the recipe description input
  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    if (value.trim()) {
      setDescriptionError('');
    }
  };

  // Handle changes in the individual ingredient input
  const handleIngredientChange = (e) => {
    const value = e.target.value;
    setIngredient(value);
    if (value.trim()) {
      setIngredientError('');
    }
  };

  // Add the ingredient to the ingredients list
  const addIngredient = () => {
    if (!ingredient.trim()) {
      setIngredientError('Ingredient cannot be empty.');
      return;
    }
    // Avoid duplicates regardless of case
    if (ingredients.map((ing) => ing.toLowerCase()).includes(ingredient.trim().toLowerCase())) {
      setIngredientError('Ingredient already added.');
      return;
    }
  
    // Update the state with the new ingredient
    setIngredients((prevIngredients) => [...prevIngredients, ingredient.trim()]);
    
    // Reset the input and clear errors
    setIngredient('');
    setIngredientsError('');
  };
  
  // Remove an ingredient from the list by index
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Form validation function to check required fields
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

  // Confirm adding the recipe after confirmation
  const confirmAddRecipe = () => {
    // Close the confirmation modal
    setShowConfirmation(false);

    try {
      const newRecipe = {
        name: recipeName,
        description: description,
        ingredients: ingredients,
      };
  
      // Call onAddRecipe to pass the new recipe back to the parent
      onAddRecipe(newRecipe);
      
    } catch (error) {
      console.error('Error adding recipe:', error);
    }

 
  };

  // Handle form submission and trigger validation
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
    </div>
  );
}

export default AddRecipe;
