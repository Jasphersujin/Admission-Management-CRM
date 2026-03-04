// import express from "express";

// import {
//   createInstitution,
//   getInstitutions,
//   getInstitutionById,
//   updateInstitution,
//   deleteInstitution
// } from "../controllers/institution.controller.js";

// const router = express.Router();

// router.post("/", createInstitution);

// router.get("/", getInstitutions);

// router.get("/:id", getInstitutionById);

// router.put("/:id", updateInstitution);

// router.delete("/:id", deleteInstitution);

// export default router;


import express from "express";

import {
  createInstitution,
  getInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution
} from "../controllers/institution.controller.js";

import auth from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const router = express.Router();

/*
Only ADMIN can manage master setup
*/

router.post(
  "/",
  auth,
  authorizeRoles("ADMIN"),
  createInstitution
);

router.get(
  "/",
  auth,
  authorizeRoles("ADMIN", "MANAGEMENT"),
  getInstitutions
);

router.get(
  "/:id",
  auth,
  authorizeRoles("ADMIN", "MANAGEMENT"),
  getInstitutionById
);

router.put(
  "/:id",
  auth,
  authorizeRoles("ADMIN"),
  updateInstitution
);

router.delete(
  "/:id",
  auth,
  authorizeRoles("ADMIN"),
  deleteInstitution
);

export default router;