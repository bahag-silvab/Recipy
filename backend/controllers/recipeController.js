import { Recipe } from "../models/associations.js";

export const createRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.json(recipe);
  } catch (err) {
    res.status(500).send("Error creating recipe");
  }
};

export const getRecipes = async (req, res) => {
  const recipes = await Recipe.findAll();
  res.json(recipes);
};

export const getRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  res.json(recipe);
};

export const updateRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  await recipe.update(req.body);
  res.json(recipe);
};

export const deleteRecipe = async (req, res) => {
  const recipe = await Recipe.findByPk(req.params.id);
  await recipe.destroy();
  res.json({ message: "Deleted" });
};