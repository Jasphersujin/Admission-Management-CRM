import express from "express";
import auth from "../middleware/auth.middleware.js";

import {
  createRole,
  getAllRoles,
  deleteRole
} from "../controllers/role.controller.js";

const router = express.Router();

router.post("/", auth, createRole);

router.get("/", auth, getAllRoles);

router.delete("/:id", auth, deleteRole);

export default router; 