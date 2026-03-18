import { Link } from "react-router-dom";
import type { Recipe } from "../utils/Recipe";

type Props = {
  meal: Recipe;
};

function RecipeCard({ meal }: Props) {
  return (
    <Link to={`/recipe/${meal.idMeal}`}>
      <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden cursor-pointer">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="h-48 w-full object-cover"
        />
        <div className="p-4">
          <h2 className="font-semibold text-gray-800">
            {meal.strMeal}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;