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
   <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
    <h1 className="text-4xl font-bold text-gray-900 mb-6">
  Recipe Explorer 
</h1>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Search recipes..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={searchRecipes}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-6">
        {recipes.map((meal) => (
          <RecipeCard key={meal.idMeal} meal={meal} />
        ))}
      </div>
    </div>
  );
}

export default Home;