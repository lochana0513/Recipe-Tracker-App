import React, { useState, useEffect } from 'react';
import { MdArrowBack } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './../styles/RecipeDetails.css';

function RecipeDetails() {
    const navigate = useNavigate(); // Initialize useNavigate hook
    const { id } = useParams(); // Extract the recipe ID from the route
    const [recipeName, setRecipeName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const handleBackClick = () => {
        navigate(`/`); // Navigate to the home page (or any other path you prefer)
    }

    useEffect(() => {
        // Simulate fetching the existing recipe by ID (replace with actual API call if needed)
        const mockRecipes = [
            {
                id: 1,
                name: 'Spaghetti Bolognese',
                description: 'A traditional Italian favorite featuring perfectly cooked spaghetti smothered in a rich and flavorful Bolognese sauce. The sauce is slow-cooked with a blend of ground beef, fresh tomatoes, aromatic herbs, and vegetables like carrots and celery, creating a hearty dish that’s both comforting and satisfying. Ideal for family dinners or special occasions, this dish pairs wonderfully with garlic bread and a side salad.',
                ingredients: [
                    'Spaghetti',
                    'Ground Beef',
                    'Tomato Sauce',
                    'Onion',
                    'Garlic',
                    'Carrot',
                    'Celery',
                    'Olive Oil'
   
                ]
            },
            {
                id: 2,
                name: 'Chicken Curry',
                description: 'A vibrant and aromatic dish inspired by South Asian cuisine. This chicken curry is made with succulent pieces of chicken simmered in a creamy, spiced coconut milk base. It is infused with a blend of turmeric, cumin, coriander, and garam masala, creating a perfect balance of heat and flavor. The dish is served best with steamed rice, naan bread, or roti, and is sure to delight your taste buds with every bite.',
                ingredients: [
                    'Chicken (boneless or bone-in)',
                    'Turmeric',
                    'Coconut Milk',
                    'Onion',
                    'Garlic',
                    'Ginger',
                    'Tomatoes',
                    'Coriander Powder',
                    'Cumin Powder'
                ]
            },
            {
                id: 3,
                name: 'Vegetarian Pizza',
                description: 'A delightful homemade pizza bursting with fresh vegetables and gooey cheese on a perfectly crisp crust. Topped with a variety of colorful ingredients such as bell peppers, mushrooms, and olives, this vegetarian pizza is both wholesome and delicious. Enhanced with a sprinkle of oregano and fresh basil, it’s an excellent choice for a quick dinner or a fun family pizza night. Customize with your favorite veggies for a personal touch!',
                ingredients: [
                    'Pizza Dough',
                    'Tomato Sauce',
                    'Mozzarella Cheese',
                    'Bell Peppers (red, yellow, or green)',
                    'Olives (black or green)',
                    'Mushrooms',
                    'Cherry Tomatoes'
                ]
            }
        ];
        

        const recipe = mockRecipes.find((r) => r.id === parseInt(id, 10));
        if (recipe) {
            setRecipeName(recipe.name);
            setDescription(recipe.description);
            setIngredients(recipe.ingredients);
        }
    }, [id]);

    return (
        <section className="view-recipe-container-main">
            <div className="view-recipe-controll-container">
                <button className="back-button" onClick={handleBackClick}>
                    <MdArrowBack />
                    <span>Back</span>
                </button>
            </div>

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
        </section>


    );
}

export default RecipeDetails;
