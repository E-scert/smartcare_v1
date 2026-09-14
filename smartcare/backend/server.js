import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./src/models/index.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Import routes
import authRoutes from "./src/routes/authRoutes.js";
import patientRoutes from "./src/routes/patientRoutes.js";
import assessmentRoutes from "./src/routes/assessmentRoutes.js";
import appointmentRoutes from "./src/routes/appointmentRoutes.js";
import staffRoutes from "./src/routes/staffRoutes.js";
import queueRoutes from "./src/routes/queueRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import departmentRoutes from "./src/routes/departmentRoutes.js";
import notificationRoutes from "./src/routes/notificationRoutes.js";

// Register routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/assessments", assessmentRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/queue", queueRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/notifications", notificationRoutes);

sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ DB connection error:", err));

sequelize
  .sync()
  .then(() => console.log("✅ Models synced"))
  .catch((err) => console.error("❌ DB sync error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
