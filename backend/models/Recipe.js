import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Recipe = sequelize.define("Recipe", {
  name: DataTypes.STRING,
  category: DataTypes.STRING,
  area: DataTypes.STRING,
  image: DataTypes.STRING,
});

export default Recipe;