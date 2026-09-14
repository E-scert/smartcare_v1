// src/models/appointmentModel.js

// Appointment model blueprint (no DB connection yet)
// const Appointment = {
//   id: "UUID",                 // primary key
//   patient_id: "UUID",         // foreign key to patients
//   assessment_id: "UUID",      // foreign key to assessments
//   department_id: "UUID",      // foreign key to departments
//   appointment_date: "date",
//   appointment_time: "time",
//   priority_level: "enum",     // HIGH | MEDIUM | STANDARD
//   status: "enum",             // PENDING | CONFIRMED | COMPLETED | CANCELLED
//   created_at: "timestamp"
// };

// export default Appointment;


// src/models/appointmentModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Appointment = sequelize.define("Appointment", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  patient_id: { type: DataTypes.UUID, allowNull: false },
  assessment_id: { type: DataTypes.UUID },
  department_id: { type: DataTypes.UUID },
  appointment_date: { type: DataTypes.DATEONLY, allowNull: false },
  appointment_time: { type: DataTypes.TIME, allowNull: false },
  priority_level: { type: DataTypes.ENUM("HIGH","MEDIUM","STANDARD"), defaultValue: "STANDARD" },
  status: { type: DataTypes.ENUM("PENDING","CONFIRMED","COMPLETED","CANCELLED"), defaultValue: "PENDING" },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: "appointments", timestamps: false });

export default Appointment;
