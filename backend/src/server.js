import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import { seedRootAdmin } from "./seed/rootAdmin.js";

import authRoutes from "./routes/auth.routes.js";
import institutionRoutes from "./routes/institution.routes.js";
import campusRoutes from "./routes/campus.routes.js";
import departmentRoutes from './routes/department.routes.js';
import sidebarsectionRoutes from './routes/sidebarsection.routes.js'

dotenv.config();

await connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Health check
app.get("/health", (req, res) => {
  res.send({ message: "status ok" });
});

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/institutions", institutionRoutes);
app.use("/api/v1/campuses", campusRoutes);
app.use("/api/v1/departments", departmentRoutes);
app.use("/api/v1/sidebarsections", sidebarsectionRoutes);

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server up and running on http://localhost:${PORT}`)
})