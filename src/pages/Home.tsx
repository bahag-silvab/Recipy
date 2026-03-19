import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useRecipes } from "../context/RecipeContext";

function Home() {
  const [query, setQuery] = useState("");
  const { recipes, searchRecipes } = useRecipes();

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
        
        <h1 className="text-4xl font-bold mb-6">
          Search your recipe
        </h1>

        <div className="flex gap-2 mb-8 w-full max-w-md">
          <input
            type="text"
            placeholder="Search recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 border px-4 py-2 rounded-lg"
          />
          <button
            onClick={() => searchRecipes(query)}
            className="bg-black text-white px-4 rounded-lg"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full">
          {recipes.map((meal) => (
            <RecipeCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;