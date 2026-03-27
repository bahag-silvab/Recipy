import fetch from "node-fetch";
import sequelize from "./config/database.js";

const seed = async () => {
  await sequelize.authenticate();

  const res = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken");
  const data = await res.json();

  for (const meal of data.meals) {
    await sequelize.query(
      `INSERT INTO "Recipes" (name, category, area, image, "createdAt", "updatedAt")
       VALUES (:name, :category, :area, :image, NOW(), NOW())`,
      {
        replacements: {
          name: meal.strMeal,
          category: meal.strCategory,
          area: meal.strArea,
          image: meal.strMealThumb,
        }
      }
    );
  }

  console.log("Seed done!");
  process.exit();
};

seed();