import { useState } from "react";
import type { Recipe } from "../utils/Recipe";

type Props = {
  recipe: Recipe;
};

function IngredientsSection({ recipe }: Props) {
  const [portions, setPortions] = useState(1);

  const increase = () => setPortions((p) => p + 1);
  const decrease = () => setPortions((p) => (p > 1 ? p - 1 : 1));

  return (
    <div className="bg-white rounded-3xl shadow-sm p-6 mt-6">
            <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl">Ingredients</h2>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">Portions</span>

          <button
            onClick={decrease}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
          >
            −
          </button>

          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
            {portions}
          </span>

          <button
            onClick={increase}
            className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center"
          >
            +
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {Array.from({ length: 20 }).map((_, i) => {
          const ingredient = recipe[`strIngredient${i + 1}`];
          const measure = recipe[`strMeasure${i + 1}`];
          if (!ingredient) return null;
          return (
            <div
              key={i}
              className="bg-gray-50 rounded-xl p-4 text-center hover:shadow-md transition"
            >
              <p className="font-medium text-sm">{ingredient}</p>
              <p className="text-gray-400 text-xs mt-1">
                {measure}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IngredientsSection;