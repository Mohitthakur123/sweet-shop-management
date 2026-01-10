import express from "express";
import cors from "cors";
import morgan from "morgan";

import { SweetService } from "./services/sweetService.js";
import authRoutes from "./routes/authRoutes.js";
import { protect, admin } from "./middleware/authMiddleware.js";

const app = express();

/* ======================
   MIDDLEWARE
====================== */

// ✅ SAFE CORS (Render + Netlify compatible)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));

/* ======================
   TEST ROUTE
====================== */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

/* ======================
   SERVICES
====================== */
const sweetService = new SweetService();

/* ======================
   ROUTES
====================== */

// Auth routes
app.use("/api/auth", authRoutes);

// Get all sweets
app.get("/api/sweets", async (req, res) => {
  try {
    const sweets = await sweetService.getAllSweets();
    res.status(200).json(sweets || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sweets" });
  }
});

// Search sweets
app.get("/api/sweets/search", async (req, res) => {
  try {
    const results = await sweetService.searchSweets(req.query);
    res.json(results || []);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to search sweets" });
  }
});

// Get sweet by ID
app.get("/api/sweets/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const sweet = await sweetService.getSweetById(id);
    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }
    res.json(sweet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sweet" });
  }
});

// Create sweet
app.post("/api/sweets", protect, async (req, res) => {
  try {
    const sweet = await sweetService.addSweet(req.body);
    res.status(201).json(sweet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update sweet
app.put("/api/sweets/:id", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updated = await sweetService.updateSweet(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Sweet not found" });
    }
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete sweet (admin)
app.delete("/api/sweets/:id", [protect, admin], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const success = await sweetService.deleteSweet(id);
    if (!success) {
      return res.status(404).json({ error: "Sweet not found" });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete sweet" });
  }
});

// Purchase sweet
app.post("/api/sweets/:id/purchase", protect, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    const sweet = await sweetService.purchaseSweet(id, quantity);
    res.json(sweet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Restock sweet (admin)
app.post("/api/sweets/:id/restock", [protect, admin], async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { quantity } = req.body;
    const sweet = await sweetService.restockSweet(id, quantity);
    res.json(sweet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/* ======================
   SERVER
====================== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
