// src/models/index.js
import sequelize from "../config/db.js";

import User from "./userModel.js";
import Patient from "./patientModel.js";
import Staff from "./staffModel.js";
import Department from "./departmentModel.js";
import Appointment from "./appointmentModel.js";
import Assessment from "./assessmentModel.js";
import Queue from "./queueModel.js";
import Notification from "./notificationModel.js";

// Associations
User.hasOne(Patient, { foreignKey: "user_id" });
Patient.belongsTo(User, { foreignKey: "user_id" });

User.hasOne(Staff, { foreignKey: "user_id" });
Staff.belongsTo(User, { foreignKey: "user_id" });

Department.hasMany(Staff, { foreignKey: "department_id" });
Staff.belongsTo(Department, { foreignKey: "department_id" });

Patient.hasMany(Assessment, { foreignKey: "patient_id" });
Assessment.belongsTo(Patient, { foreignKey: "patient_id" });

Patient.hasMany(Appointment, { foreignKey: "patient_id" });
Appointment.belongsTo(Patient, { foreignKey: "patient_id" });

Appointment.hasOne(Queue, { foreignKey: "appointment_id" });
Queue.belongsTo(Appointment, { foreignKey: "appointment_id" });

Patient.hasMany(Notification, { foreignKey: "patient_id" });
Notification.belongsTo(Patient, { foreignKey: "patient_id" });

export {
  sequelize,
  User,
  Patient,
  Staff,
  Department,
  Appointment,
  Assessment,
  Queue,
  Notification
};
