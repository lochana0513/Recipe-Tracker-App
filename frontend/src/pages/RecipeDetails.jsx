import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import './../styles/RecipeDetails.css';

function RecipeDetails() {
    const navigate = useNavigate();
    const { id } = useParams(); // Extract the recipe ID from the route
    // State hooks for managing data
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const handleBackClick = () => {
        navigate(`/`); // Navigate to the home page
    };

    useEffect(() => {
        // Fetch recipe details from the backend
        const fetchRecipeDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from localStorage
                if (!token) throw new Error('Unauthorized: Token not found.');

                const response = await axios.get(
                    `http://localhost:5000/api/recipes/${id}`, // Replace with your API endpoint
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const recipe = response.data;

                setRecipeName(recipe.name);
                setDescription(recipe.description);
                setIngredients(recipe.ingredients || []); // Ensure ingredients is an array
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                const message = error.response?.data?.message || 'Failed to fetch recipe details.';
                setErrorMessage(message);
            }
        };

        fetchRecipeDetails();
    }, [id]);

    return (
        <section className="view-recipe-container-main">
            <div className="view-recipe-controll-container">
                <button className="back-button" onClick={handleBackClick}>
                    <MdArrowBack />
                    <span>Back</span>
                </button>
            </div>

            {errorMessage ? (
                <p className="error-message">{errorMessage}</p>
            ) : (
                <>
                    <h1 className="view-recipe-title">{recipeName}</h1>

                    <div className="view-recipe-container">
                        <div className="view-recipe-container-left">
                            <h2 className="section-title">Description</h2>
                            <p className="recipe-description">{description}</p>
                        </div>
                        <div className="view-recipe-container-right">
                            <h2 className="section-title">Ingredients</h2>
                            <ul className="ingredient-list">
                                {ingredients.map((ingredient, index) => (
                                    <li key={index} className="ingredient-item">{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}

export default RecipeDetails;
