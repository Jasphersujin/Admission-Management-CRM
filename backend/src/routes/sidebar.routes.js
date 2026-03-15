import express from "express";
import auth from "../middleware/auth.middleware.js";
import { getSidebar } from "../controllers/sidebar.controller.js";

const router = express.Router();

router.get("/", auth, getSidebar);

export default router;