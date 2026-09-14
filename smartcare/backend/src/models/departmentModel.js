// src/models/departmentModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Department = sequelize.define("Department", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING(100), allowNull: false, unique: true },
  description: { type: DataTypes.TEXT },
}, { tableName: "departments", timestamps: false });

export default Department;
