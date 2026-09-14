// src/routes/appointmentRoutes.js
import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} from "../controllers/appointmentController.js";

const router = express.Router();

// src/routes/appointmentRoutes.js
router.post("/", authenticate, authorize("PATIENT","ADMIN"), createAppointment);
router.get("/", authenticate, authorize("ADMIN","DOCTOR","NURSE","RECEPTIONIST"), getAppointments);
router.get("/:id", authenticate, getAppointmentById);
router.put("/:id", authenticate, authorize("ADMIN","DOCTOR","NURSE","RECEPTIONIST"), updateAppointment);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteAppointment);

export default router;
