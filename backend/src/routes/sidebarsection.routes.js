import express from 'express'
import auth from '../middleware/auth.middleware.js';
import { authorizeRoles } from '../middleware/role.middleware.js';
import { createSidebarSection, getAllSidebarSections } from '../controllers/sidebarsection.controller.js';

const router = express.Router();


// Create 
router.post(
    "/",
    auth,
    authorizeRoles("ADMIN"),
    createSidebarSection,
);

// Get ALL
router.get(
    "/",
    auth,
    authorizeRoles("ADMIN"),
    getAllSidebarSections,
)



export default router;