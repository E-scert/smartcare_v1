// src/models/staffModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Staff = sequelize.define("Staff", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  user_id: { type: DataTypes.UUID, allowNull: false, unique: true },
  department_id: { type: DataTypes.UUID, allowNull: false },
  employee_number: { type: DataTypes.STRING(50), allowNull: false, unique: true },
  first_name: { type: DataTypes.STRING(100), allowNull: false },
  last_name: { type: DataTypes.STRING(100), allowNull: false },
  status: { type: DataTypes.STRING(30), defaultValue: "ACTIVE" },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "staff", timestamps: false });

export default Staff;
