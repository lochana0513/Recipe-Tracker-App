import React from 'react';
import RecipeCard from './RecipeCard';
import './../../styles/home/RecipeContainer.css';
function RecipeContainer() {
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
      description: 'A delicious pizza topped with fresh vegetables and mozzarella cheese. A healthy and tasty option for pizza lovers.A delicious pizza topped with fresh vegetables and mozzarella cheese. A healthy and tasty option for pizza lovers.',
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

  // Handle click on card (can be used to navigate or show more details)
  const handleCardClick = (id) => {
    console.log(`Recipe with ID: ${id} clicked`);
    // Add functionality here, like opening a detailed view of the recipe
  };

  return (
    <div className="recipe-container">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          title={recipe.title}
          description={recipe.description}
          onClick={() => handleCardClick(recipe.id)}
        />
      ))}
    </div>
  );
}

export default RecipeContainer;
