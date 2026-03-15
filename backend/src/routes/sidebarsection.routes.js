// import express from 'express'
// import auth from '../middleware/auth.middleware.js';
// import { authorizeRoles } from '../middleware/role.middleware.js';
// import { 
//     createSidebarSection, 
//     getAllSidebarSections, 
//     getSidebarSectionByID, 
//     toggleSidebarSectionStatus, 
//     updateSidebarSection,
//     deleteSidebarSection
// } from '../controllers/sidebarsection.controller.js';

// const router = express.Router();


// // Create 
// router.post(
//     "/",
//     auth,
//     authorizeRoles("ADMIN"),
//     createSidebarSection,
// );

// // Get ALL
// router.get(
//     "/",
//     auth,
//     authorizeRoles("ADMIN"),
//     getAllSidebarSections,
// )

// // Get By ID
// router.get(
//     "/:id",
//     auth,
//     authorizeRoles("ADMIN"),
//     getSidebarSectionByID,
// );

// // Update
// router.put(
//   "/:id",
//   auth,
//   authorizeRoles("ADMIN"),
//   updateSidebarSection
// );

// // Delete
// router.delete(
//   "/:id",
//   auth,
//   authorizeRoles("ADMIN"),
//   deleteSidebarSection
// );

// // Toggle Active
// router.patch(
//   "/:id/toggle-status",
//   auth,
//   authorizeRoles("ADMIN"),
//   toggleSidebarSectionStatus
// );


// export default router;


import express from "express";
import auth from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  createSidebarSection,
  getAllSidebarSections,
  getSidebarSectionByID,
  updateSidebarSection,
  deleteSidebarSection,
  toggleSidebarSectionStatus
} from "../controllers/sidebarsection.controller.js";

const router = express.Router();

router.post("/", auth, authorizeRoles("ADMIN"), createSidebarSection);

router.get("/", auth, getAllSidebarSections);

router.get("/:id", auth, getSidebarSectionByID);

router.put("/:id", auth, authorizeRoles("ADMIN"), updateSidebarSection);

router.delete("/:id", auth, authorizeRoles("ADMIN"), deleteSidebarSection);

router.patch("/:id/toggle-status", auth, authorizeRoles("ADMIN"), toggleSidebarSectionStatus);

export default router;