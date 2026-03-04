import express from "express";

import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} from "../controllers/department.controller.js";

import auth from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();


router.post(
  "/",
  auth,
  authorizeRoles("ADMIN"),
  createDepartment
);


router.get(
  "/",
  auth,
  authorizeRoles("ADMIN","MANAGEMENT"),
  getDepartments
);


router.get(
  "/:id",
  auth,
  authorizeRoles("ADMIN","MANAGEMENT"),
  getDepartmentById
);


router.put(
  "/:id",
  auth,
  authorizeRoles("ADMIN"),
  updateDepartment
);


router.delete(
  "/:id",
  auth,
  authorizeRoles("ADMIN"),
  deleteDepartment
);

export default router;