import express from "express";
import auth from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  createScreen,
  getAllScreens,
  getScreenByID,
  updateScreen,
  deleteScreen
} from "../controllers/screen.controller.js";

const router = express.Router();


// Create Screen
router.post(
  "/",
  auth,
  authorizeRoles("ADMIN"),
  createScreen
);


// Get All Screens
router.get(
  "/",
  auth,
  getAllScreens
);


// Get Screen by ID
router.get(
  "/:id",
  auth,
  getScreenByID
);


// Update Screen
router.put(
  "/:id",
  auth,
  authorizeRoles("ADMIN"),
  updateScreen
);


// Delete Screen
router.delete(
  "/:id",
  auth,
  authorizeRoles("ADMIN"),
  deleteScreen
);

export default router;