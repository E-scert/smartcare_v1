// src/models/queueModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Queue = sequelize.define("Queue", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  appointment_id: { type: DataTypes.UUID, allowNull: false },
  queue_number: { type: DataTypes.INTEGER, allowNull: false },
  priority_score: { type: DataTypes.INTEGER, allowNull: false },
  queue_date: { type: DataTypes.DATEONLY, allowNull: false },
  status: {
    type: DataTypes.ENUM("WAITING", "IN_PROGRESS", "COMPLETED", "SKIPPED"),
    defaultValue: "WAITING",
  },
}, { tableName: "queue_entries", timestamps: false });

export default Queue;
