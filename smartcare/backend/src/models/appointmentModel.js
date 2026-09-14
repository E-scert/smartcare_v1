// src/models/appointmentModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Appointment = sequelize.define(
  "Appointment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    patient_id: { type: DataTypes.UUID, allowNull: false },
    assessment_id: { type: DataTypes.UUID },
    department_id: { type: DataTypes.UUID },
    appointment_date: { type: DataTypes.DATEONLY, allowNull: false },
    appointment_time: { type: DataTypes.TIME, allowNull: false },

    priority_level: {
      type: DataTypes.ENUM({
        values: ["HIGH", "MEDIUM", "STANDARD"],
        name: "priority_level",
      }),
      defaultValue: "STANDARD",
    },

    status: {
      type: DataTypes.ENUM({
        values: ["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"], // include NO_SHOW
        name: "appointment_status",
      }),
      defaultValue: "PENDING",
    },

    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "appointments", timestamps: false },
);

export default Appointment;
