// src/routes/assessmentRoutes.js
import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  createAssessment,
  getAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment
} from "../controllers/assessmentController.js";

const router = express.Router();

// src/routes/assessmentRoutes.js
router.post("/", authenticate, authorize("PATIENT","ADMIN"), createAssessment);
router.get("/", authenticate, authorize("ADMIN","DOCTOR","NURSE"), getAssessments);
router.get("/:id", authenticate, getAssessmentById);
router.put("/:id", authenticate, authorize("ADMIN","DOCTOR","NURSE"), updateAssessment);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteAssessment);


export default router;
