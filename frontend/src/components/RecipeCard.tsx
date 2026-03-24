import { Link } from "react-router-dom";
import type { Recipe } from "../utils/Recipe";

type Props = {
  meal: Recipe;
};

function RecipeCard({ meal }: Props) {
  return (
    <Link to={`/recipe/${meal.id}`}>
      <div className="bg-white rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition duration-200 cursor-pointer w-full">
        
        <div className="h-24 overflow-hidden rounded-t-xl">
          <img
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/300";
            }}
          />
        </div>

        <div className="p-2">
          <h2 className="text-xs font-medium text-gray-800 leading-tight line-clamp-2">
            {meal.name}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;