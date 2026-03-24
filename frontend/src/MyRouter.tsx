import { Routes, Route } from "react-router-dom";
import App from "./App";
import Navbar from "./components/NavBar";
import RecipeDetails from "./pages/RecipeDetails";

const MyRouter = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </>
  );
};

export default MyRouter;