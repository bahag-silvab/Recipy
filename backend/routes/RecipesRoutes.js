import { Router } from "express";
import {
  getAllRecipes,
  getRecipeByID,
  createNewRecipe,
} from "../controllers/RecipesController.js";

const RecipesRoutes = Router();

RecipesRoutes.get("/recipes", getAllRecipes);
RecipesRoutes.get("/recipe/:recipeID", getRecipeByID);
RecipesRoutes.post("/recipe", createNewRecipe);

export default RecipesRoutes;