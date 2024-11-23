import React, { useState } from 'react';
import './../../styles/home/AddRecipe.css';  // Import the CSS file

function AddRecipe() {
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');

  const addIngredient = () => {
    if (ingredient) {
      setIngredients([...ingredients, ingredient]);
      setIngredient(''); // Reset ingredient input field
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const recipe = {
      name: recipeName,
      description: description,
      ingredients: ingredients,
    };
    console.log('Recipe Saved:', recipe);
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
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="Enter recipe name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description:</label>
        <textarea
          id="description"
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
        />
      </div>

      <div className="form-group">
        <label htmlFor="ingredients" className="form-label">Ingredients:</label>
        <div className="ingredient-input-container">
          <input
            type="text"
            id="ingredients"
            className="form-input"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter an ingredient"
          />
          <button className="add-ingredient-button" onClick={addIngredient}>Add Ingredient</button>
        </div>

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
      </div>
      <div className="add-recipe-save-container">
      <button className="save-recipe-button" onClick={handleSubmit}>Save Recipe</button>
      </div>
    </div>
  );
}

export default AddRecipe;
