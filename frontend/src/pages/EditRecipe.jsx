import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import './../styles/EditRecipe.css';
import { useNavigate } from 'react-router-dom';
function EditRecipe() {
  const { id } = useParams(); // Extract the recipe ID from the route
  const [recipeName, setRecipeName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleBackClick = () => {
    navigate(`/`); // Navigate to the home page (or any other path you prefer)
  }

  useEffect(() => {
    // Simulate fetching the existing recipe by ID
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
  }, [id]); // Dependency ensures this runs when the ID changes

  const addIngredient = () => {
    if (ingredient) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleUpdate = () => {
    const updatedRecipe = {
      id: parseInt(id, 10),
      name: recipeName,
      description,
      ingredients,
    };
    console.log('Updated Recipe:', updatedRecipe);
    // Add API call or state update logic here
  };

  return (
    <section className="edit-recipe-container-main">

    <div className="edit-recipe-controll-container">
            <button className="back-button" onClick={handleBackClick} >
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

      <div className="edit-recipe-save-container">
        <button className="save-recipe-button" onClick={handleUpdate}>Update Recipe</button>
      </div>
    </div>

    </section>
  );
}

export default EditRecipe;
