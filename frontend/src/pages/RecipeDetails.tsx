import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Recipe } from "../utils/Recipe";

function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      const res = await fetch(`http://localhost:3000/recipes/${id}`);
      const data = await res.json();
      setRecipe(data);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="p-6">Loading...</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4"></div>

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
              src={recipe.image}
              alt={recipe.name}
              className="rounded-xl w-full h-full object-cover"
            />

            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                {recipe.name}
              </h1>

              <p className="text-gray-600 mt-3">
                {recipe.instructions || "No instructions available."}
              </p>

              <div className="flex gap-2 mt-4">
                <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                  {recipe.category}
                </span>
                <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm">
                  {recipe.area}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Ingredients</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {recipe.ingredients?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl p-3 text-center"
                >
                  <p className="font-semibold text-sm">
                    {item.ingredient}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.measure}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;