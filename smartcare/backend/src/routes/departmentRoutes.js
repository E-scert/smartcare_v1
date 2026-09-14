// src/routes/departmentRoutes.js
import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment
} from "../controllers/departmentController.js";

const router = express.Router();

// src/routes/departmentRoutes.js
router.post("/", authenticate, authorize("ADMIN"), createDepartment);
// PATIENT is included so patients can populate the department dropdown when booking an appointment
router.get("/", authenticate, authorize("ADMIN","DOCTOR","NURSE","PHARMACIST","RECEPTIONIST","PATIENT"), getDepartments);
router.get("/:id", authenticate, getDepartmentById);
router.put("/:id", authenticate, authorize("ADMIN"), updateDepartment);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteDepartment);

export default router;
