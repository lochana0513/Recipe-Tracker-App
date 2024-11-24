import React, { useState } from 'react';
import ManageBar from '../components/home/ManageBar';
import Herosection from '../components/home/Herosection';
import Popup from '../components/controllers/Popup';
import RecipeContainer from '../components/home/RecipeContainer';
import AddRecipe from '../components/home/AddRecipe';

function Home() {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: 'Spaghetti Bolognese',
      description: 'A classic Italian pasta dish with rich tomato and meat sauce.',
    },
    {
      id: 2,
      name: 'Chicken Curry',
      description: 'A spicy and flavorful chicken curry.',
    },
    {
      id: 3,
      name: 'Vegetarian Pizza',
      description: 'A delicious pizza topped with fresh vegetables and mozzarella cheese.',
    },
  ]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const addRecipe = (newRecipe) => {
    // Generate a new id for the new recipe
    const id = recipes.length > 0 ? recipes[recipes.length - 1].id + 1 : 1;
    newRecipe.id = id; // Add an id to the new recipe
    setRecipes([...recipes, newRecipe]); // Add the new recipe to the state
    closePopup();
  };

  return (
    <div>
      <section>
        <Herosection />
      </section>
      <section>
        <ManageBar ontoggleCreateJob={openPopup} />
        {isPopupOpen && (
          <Popup onClose={closePopup}>
            <AddRecipe onAddRecipe={addRecipe} /> {/* Pass addRecipe to AddRecipe */}
          </Popup>
        )}
        <RecipeContainer recipes={recipes} setRecipes={setRecipes} />
      </section>
    </div>
  );
}

export default Home;
