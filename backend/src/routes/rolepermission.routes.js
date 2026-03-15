import express from "express";
import auth from "../middleware/auth.middleware.js";

import {
  assignRolePermission,
  getAllPermissions,
  deletePermission
} from "../controllers/rolepermission.controller.js";

const router = express.Router();

router.post("/", auth, assignRolePermission);

router.get("/", auth, getAllPermissions);

router.delete("/:id", auth, deletePermission);

export default router;