import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import RecipeCard from './RecipeCard';
import './../../styles/home/RecipeContainer.css';

function RecipeContainer() {
  const navigate = useNavigate(); // Create a navigation function

  // Example recipe data
  const recipes = [
    {
      id: 1,
      title: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish with rich tomato and meat sauce. The combination of flavors makes it a popular choice.',
    },
    {
      id: 2,
      title: 'Chicken Curry',
      description: 'A spicy and flavorful chicken curry perfect with rice or naan. It is made with aromatic spices like turmeric and cumin.',
    },
    {
      id: 3,
      title: 'Vegetarian Pizza',
      description: 'A delicious pizza topped with fresh vegetables and mozzarella cheese. A healthy and tasty option for pizza lovers.',
    },
    {
      id: 4,
      title: 'Grilled Salmon',
      description: 'A delicious grilled salmon dish with a smoky flavor and served with a side of vegetables.',
    },
    {
      id: 5,
      title: 'Chocolate Cake',
      description: 'A rich and moist chocolate cake topped with creamy frosting, perfect for any occasion.',
    },
    {
      id: 6,
      title: 'Caesar Salad',
      description: 'A refreshing salad with crisp romaine lettuce, crunchy croutons, and creamy Caesar dressing.',
    },
  ];

  // Handle navigation to edit page
  const handleUpdateClick = (id) => {
    navigate(`/edit-recipe/${id}`); // Navigate to the edit page with recipe ID
  };

  const handleViewClick = (id) => {
    navigate(`/view-recipe/${id}`); // Navigate to the edit page with recipe ID
  };

  return (
    <div className="recipe-container-main">

    <h1 className="view-recipe-title">Recipes</h1>

    <div className="recipe-container">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          description={recipe.description}
          onView={() => handleViewClick(recipe.id)}
          onUpdate={() => handleUpdateClick(recipe.id)} // Pass the function to the card
        />
      ))}
    </div>
    </div>
  );
}

export default RecipeContainer;
