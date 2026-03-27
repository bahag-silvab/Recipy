import express from "express";
import "dotenv/config";
import cors from "cors";
import sequelize from "./config/database.js";
import "./models/associations.js";
import userRoutes from "./routes/userRoutes.js";       
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import recipeRoutes from './routes/recipesRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import { authenticateJWT } from "./middlewares/authenticateJWT.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { checkAdmin } from "./middlewares/checkAdmin.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);

// Start server
app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connected");

    await sequelize.sync({ alter: true });

    console.log(" Server running on http://localhost:3000");
  } catch (err) {
    console.log(err);
  }
});

// Protected route
app.get("/api/profile", authenticateJWT, (req, res) => {
  res.json({ message: `Welcome user ${req.user.id}` });
});

// Admin-only route
app.get("/api/admin-dashboard", authenticateJWT, checkAdmin, (req, res) => {
  res.json({ message: "Welcome admin!" });
});

// Error handler (must be last)
app.use(errorHandler);