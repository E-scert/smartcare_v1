// src/models/notificationModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Notification = sequelize.define(
  "Notification",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    patient_id: { type: DataTypes.UUID, allowNull: false },
    type: { type: DataTypes.ENUM("EMAIL", "SMS", "PUSH"), allowNull: false },
    message: { type: DataTypes.TEXT, allowNull: false },
    status: {
      type: DataTypes.ENUM("PENDING", "SENT", "FAILED"),
      defaultValue: "PENDING",
    },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "notifications", timestamps: false },
);

export default Notification;
