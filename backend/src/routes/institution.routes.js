import express from "express";

import {
  createInstitution,
  getInstitutions,
  getInstitutionById,
  updateInstitution,
  deleteInstitution
} from "../controllers/institution.controller.js";

const router = express.Router();

router.post("/", createInstitution);

router.get("/", getInstitutions);

router.get("/:id", getInstitutionById);

router.put("/:id", updateInstitution);

router.delete("/:id", deleteInstitution);

export default router;