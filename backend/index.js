import express from "express";
import "dotenv/config";
import cors from "cors";

import sequelize from "./config/database.js";
import "./models/associations.js";

import userRoutes from "./routes/userRoutes.js";       
import recipesRoutes from "./routes/recipeRoutes.js"; 

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipesRoutes);

// Start server
app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    await sequelize.sync({ alter: true });

    console.log("🚀 Server running on http://localhost:3000");
  } catch (err) {
    console.log(err);
  }
});