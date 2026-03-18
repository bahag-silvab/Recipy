import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Recipe, RecipeApiResponse } from "../utils/Recipe";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      const data: RecipeApiResponse = await res.json();
      setRecipe(data.meals[0]);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-gray-500 hover:underline"
      >
        ← Back
      </button>

      <div className="grid grid-cols-12 gap-6">
                <div className="col-span-8 space-y-6">
          
          <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-2 gap-6">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="rounded-xl w-full h-full object-cover"
            />

            <div>
              <h1 className="text-2xl font-bold mb-3">
                {recipe.strMeal}
              </h1>

              <p className="text-gray-600 text-sm leading-relaxed">
                {recipe.strInstructions.slice(0, 200)}...
              </p>

              <div className="flex gap-2 mt-4 flex-wrap">
                <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                  {recipe.strCategory}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                  {recipe.strArea}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>

            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];

                if (!ingredient) return null;

                return (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-xl p-3 text-center text-sm"
                  >
                    <p className="font-medium">{ingredient}</p>
                    <p className="text-gray-500">{measure}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Cooking Directions
            </h2>

            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {recipe.strInstructions}
            </p>
          </div>
        </div>

        <div className="col-span-4 space-y-6">
                    <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-2">Chef</h3>
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/50"
                alt="chef"
                className="rounded-full"
              />
              <div>
                <p className="font-medium">Chef AI</p>
                <p className="text-sm text-gray-500">
                  Recipe Creator
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-3">
              You may also like
            </h3>
            <div className="space-y-3">
              <img
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                className="rounded-lg"
              />
              <p className="text-sm">{recipe.strMeal}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;