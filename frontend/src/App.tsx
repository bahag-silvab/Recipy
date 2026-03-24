import { Route, Routes } from "react-router";
import RecipeDetails from "./pages/RecipeDetails";
import Home from "./pages/Home";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
  );
}

export default App;