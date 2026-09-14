// src/routes/queueRoutes.js
import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  createQueue,
  getQueueEntries,
  getQueueById,
  updateQueue,
  deleteQueue
} from "../controllers/queueController.js";

const router = express.Router();

// src/routes/queueRoutes.js
router.post("/", authenticate, authorize("ADMIN","RECEPTIONIST"), createQueue);
router.get("/", authenticate, authorize("ADMIN","DOCTOR","NURSE","RECEPTIONIST"), getQueueEntries);
router.get("/:id", authenticate, getQueueById);
router.put("/:id", authenticate, authorize("ADMIN","RECEPTIONIST"), updateQueue);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteQueue);


export default router;
