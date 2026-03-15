import express from "express";
import auth from "../middleware/auth.middleware.js";

import {
  createAction,
  getAllActions,
  deleteAction
} from "../controllers/action.controller.js";

const router = express.Router();

router.post("/", auth, createAction);

router.get("/", auth, getAllActions);

router.delete("/:id", auth, deleteAction);

export default router;