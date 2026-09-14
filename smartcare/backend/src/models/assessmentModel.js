// src/models/assessmentModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Assessment = sequelize.define(
  "Assessment",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    patient_id: { type: DataTypes.UUID, allowNull: false },
    symptoms: { type: DataTypes.JSON },
    priority_level: {
      type: DataTypes.ENUM("HIGH", "MEDIUM", "STANDARD"),
      defaultValue: "STANDARD",
    },
    recommended_service: { type: DataTypes.STRING },
    submitted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { tableName: "assessments", timestamps: false },
);

export default Assessment;
