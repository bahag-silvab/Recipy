import User from "./User.js";
import Recipe from "./Recipe.js";

User.hasMany(Recipe, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Recipe.belongsTo(User, {
  foreignKey: "userId",
});

export const applyAssociations = () => {
  User.hasMany(Recipe, { foreignKey: "userId" });
  Recipe.belongsTo(User, { foreignKey: "userId" });
};

export { User, Recipe };