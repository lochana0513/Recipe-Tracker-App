import React, { useState } from 'react';
import ManageBar from '../components/home/ManageBar';
import Herosection from '../components/home/Herosection';
import Popup from '../components/controllers/Popup';
import RecipeContainer from '../components/home/RecipeContainer';
function Home() {

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div>
      <section>
        <Herosection />
      </section>
      <section>
        <ManageBar ontoggleCreateJob={openPopup} />
        {isPopupOpen && (
          <Popup onClose={closePopup}>
            <p>Hello! This is a popup.</p>
          </Popup>
        )}
        <RecipeContainer/>
      </section>
    </div>
  );
}

export default Home;
