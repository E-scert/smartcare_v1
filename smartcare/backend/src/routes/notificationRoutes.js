// src/routes/notificationRoutes.js
import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  createNotification,
  getNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification
} from "../controllers/notificationController.js";

const router = express.Router();
// src/routes/notificationRoutes.js
router.post("/", authenticate, authorize("ADMIN"), createNotification);
router.get("/", authenticate, authorize("ADMIN"), getNotifications);
router.get("/:id", authenticate, getNotificationById);
router.put("/:id", authenticate, authorize("ADMIN"), updateNotification);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteNotification);

export default router;
