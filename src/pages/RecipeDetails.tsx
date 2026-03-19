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
    <div className="bg-gray-50 min-h-screen py-10">
  <div className="max-w-6xl mx-auto px-4"></div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-500 hover:underline"
      >
        ← Back
      </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
<div className="col-span-4 space-y-6"> 
          <div className="bg-white rounded-2xl shadow p-6 grid grid-cols-2 gap-6">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="rounded-xl w-full h-full object-cover"
            />

            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {recipe.strMeal}
                </h1>

                <p className="text-gray-600 mt-3 leading-relaxed">
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
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">
              Ingredients
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">

              {Array.from({ length: 20 }).map((_, i) => {
                const ingredient = recipe[`strIngredient${i + 1}`];
                const measure = recipe[`strMeasure${i + 1}`];

                if (!ingredient) return null;

                return (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-xl hover:bg-white hover:shadow transition p-3 flex flex-col items-center text-center border border-gray-100"
                  >
                    {/* Icon */}
                    <div className="w-10 h-10 mb-2 flex items-center justify-center bg-gray-100 rounded-full">
                      🥕
                    </div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {ingredient}
                    </p>

                    <p className="text-gray-500 text-xs mt-1">
                      {measure}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DIRECTIONS */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">
              Cooking Directions
            </h2>

            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {recipe.strInstructions}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-4 space-y-6">

          {/* CHEF */}
          <div className="bg-white rounded-2xl shadow p-4">
            <h3 className="font-semibold mb-2">Chef</h3>

            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/50"
                alt="chef"
                className="rounded-full"
              />
              <div>
                <p className="font-medium">Marc Macron</p>
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