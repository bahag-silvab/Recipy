import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import type { Recipe, RecipeApiResponse } from "../utils/Recipe";

function Home() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]); 

  const searchRecipes = async () => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    const data: RecipeApiResponse = await res.json();
    setRecipes(data.meals || []);
  };

  return (
 <div className="min-h-screen bg-gray-50 py-10">
  <div className="max-w-4xl mx-auto px-4 flex flex-col items-center">
      
      {/* Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Search your recipe
      </h1>

      {/* Search */}
      <div className="flex gap-2 mb-8 w-full max-w-md">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none"
        />
        <button
          onClick={searchRecipes}
          className="bg-black text-white px-4 rounded-lg hover:bg-gray-800 transition"
        >
          Search
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
        {recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

    </div>
  </div>
  );
}

export default Home;