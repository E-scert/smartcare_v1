// src/routes/userRoutes.js
import express from "express";
import { authenticate, authorize } from "../middleware/authMiddleware.js";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", authenticate, authorize("ADMIN"), createUser);       // CREATE
router.get("/", authenticate, authorize("ADMIN"), getUsers);          // READ all
router.get("/:id", authenticate, getUserById);                        // READ one
router.put("/:id", authenticate, authorize("ADMIN"), updateUser);      // UPDATE
router.delete("/:id", authenticate, authorize("ADMIN"), deleteUser);   // DELETE

export default router;
