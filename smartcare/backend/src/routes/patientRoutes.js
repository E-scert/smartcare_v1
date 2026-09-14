// src/routes/patientRoutes.js
import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} from "../controllers/patientController.js";

const router = express.Router();

router.post("/", authenticate, authorize("ADMIN"), createPatient);
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"),
  getPatients,
);
router.get("/:id", authenticate, getPatientById);
router.put("/:id", authenticate, authorize("ADMIN", "DOCTOR"), updatePatient);
router.delete("/:id", authenticate, authorize("ADMIN"), deletePatient);

export default router;
