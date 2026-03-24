import fetch from "node-fetch";
import pool from "./db.js";

const seed = async () => {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
  );
  const data = await res.json();

  for (const meal of data.meals) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }

    await pool.query(
      `INSERT INTO recipes 
      (name, category, area, image, instructions, ingredients)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        meal.strMeal,
        meal.strCategory,
        meal.strArea,
        meal.strMealThumb,
        meal.strInstructions,
        JSON.stringify(ingredients),
      ]
    );
  }

  console.log("Seed done with full data!");
  process.exit();
};

seed();