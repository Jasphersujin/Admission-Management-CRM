import express from "express";
import auth from "../middleware/auth.middleware.js";

import {
  createFeature,
  getAllFeatures,
  getFeatureByID,
  updateFeature,
  deleteFeature
} from "../controllers/feature.controller.js";

const router = express.Router();

router.post("/", auth, createFeature);

router.get("/", auth, getAllFeatures);

router.get("/:id", auth, getFeatureByID);

router.put("/:id", auth, updateFeature);

router.delete("/:id", auth, deleteFeature);

export default router;