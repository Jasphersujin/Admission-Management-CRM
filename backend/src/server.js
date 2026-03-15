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
import sidebarRoutes from "./routes/sidebar.routes.js";
import featureRoutes from "./routes/feature.routes.js";
import screenRoutes from "./routes/screen.routes.js";
import roleRoutes from "./routes/role.routes.js";
import actionRoutes from "./routes/action.routes.js";
import rolePermissionRoutes from "./routes/rolepermission.routes.js";

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
app.use("/api/v1/sidebarsections", sidebarsectionRoutes);

app.use("/api/v1/features", featureRoutes);

app.use("/api/v1/screens", screenRoutes);

app.use("/api/v1/actions", actionRoutes);

app.use("/api/v1/roles", roleRoutes);

app.use("/api/v1/permissions", rolePermissionRoutes);

app.use("/api/v1/sidebar", sidebarRoutes);


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server up and running on http://localhost:${PORT}`)
})