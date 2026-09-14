// src/routes/staffRoutes.js
import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  createStaff,
  getStaff,
  getStaffById,
  updateStaff,
  deleteStaff
} from "../controllers/staffController.js";

const router = express.Router();

// src/routes/staffRoutes.js
router.post("/", authenticate, authorize("ADMIN"), createStaff);
router.get("/", authenticate, authorize("ADMIN"), getStaff);
router.get("/:id", authenticate, getStaffById);
router.put("/:id", authenticate, authorize("ADMIN"), updateStaff);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteStaff);

export default router;
