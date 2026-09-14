// src/models/patientModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Patient = sequelize.define("Patient", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false, unique: true },
  first_name: { type: DataTypes.STRING(100), allowNull: false },
  last_name: { type: DataTypes.STRING(100), allowNull: false },
  id_number: { type: DataTypes.STRING(20), unique: true },
  date_of_birth: { type: DataTypes.DATEONLY, allowNull: false },
  gender: { type: DataTypes.STRING(20) },
  phone: { type: DataTypes.STRING(20) },
  address: { type: DataTypes.TEXT },
  disability_status: { type: DataTypes.BOOLEAN, defaultValue: false },
  pregnancy_status: { type: DataTypes.BOOLEAN, defaultValue: false },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "patients", timestamps: false });

export default Patient;
