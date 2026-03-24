import express from "express";
import cors from "cors";
import pool from "./db.js"; 

const app = express();
const PORT = 3000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running 🚀");
});


app.post("/recipes", async (req, res) => {
  try {
    console.log("📦 BODY:", req.body);

    const { name, category, area, image } = req.body;

    const result = await pool.query(
      "INSERT INTO recipes (name, category, area, image) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, category, area, image]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("🔥 CREATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


app.get("/recipes", async (req, res) => {
  const { search } = req.query;

  try {
    if (search) {
      const result = await pool.query(
        "SELECT * FROM recipes WHERE name ILIKE $1",
        [`%${search}%`]
      );
      return res.json(result.rows);
    }

    const result = await pool.query("SELECT * FROM recipes");
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching recipes");
  }
});


app.get("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM recipes WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("🔥 READ ONE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


app.put("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, area, image } = req.body;

    const result = await pool.query(
      "UPDATE recipes SET name=$1, category=$2, area=$3, image=$4 WHERE id=$5 RETURNING *",
      [name, category, area, image, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("🔥 UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


app.delete("/recipes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM recipes WHERE id=$1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    console.error("🔥 DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});