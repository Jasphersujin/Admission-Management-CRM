import express from "express";

import {
  createCampus,
  getCampuses,
  getCampusById,
  updateCampus,
  deleteCampus,
  getCampusesByInstitution
} from "../controllers/campus.controller.js";

import auth from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/*
ADMIN → create master data
*/
router.post(
  "/",
  auth,
  authorizeRoles("ADMIN"),
  createCampus
);


/*
ADMIN + MANAGEMENT → view
*/
router.get(
  "/",
  auth,
  authorizeRoles("ADMIN", "MANAGEMENT"),
  getCampuses
);


router.get(
  "/:id",
  auth,
  authorizeRoles("ADMIN", "MANAGEMENT"),
  getCampusById
);


/*
ADMIN → update
*/
router.put(
  "/:id",
  auth,
  authorizeRoles("ADMIN"),
  updateCampus
);


/*
ADMIN → delete
*/
router.delete(
  "/:id",
  auth,
  authorizeRoles("ADMIN"),
  deleteCampus
);

/*
ADMIN + MANAGEMENT → view campuses by institution
*/
router.get(
  "/institution/:institutionId",
  auth,
  authorizeRoles("ADMIN", "MANAGEMENT"),
  getCampusesByInstitution
);

export default router;