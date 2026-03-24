import { createContext, useContext, useState } from "react";
import type { Recipe, RecipeApiResponse } from "../utils/Recipe";

type RecipeContextType = {
  recipes: Recipe[];
  searchRecipes: (query: string) => Promise<void>;
};

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider = ({ children }: { children: React.ReactNode }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const searchRecipes = async (query: string) => {
    const res = await fetch(
     `http://localhost:3000/recipes?search=${query}`
    );

   const data = await res.json();
   setRecipes(data);
  };

  return (
    <RecipeContext.Provider value={{ recipes, searchRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error("useRecipes must be used within RecipeProvider");
  }
  return context;
};