import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/view-recipe/:id" element={<RecipeDetails />} />
        </Routes>
        
        <Footer />
      </Router>
    </div>
  );
}

export default App;
