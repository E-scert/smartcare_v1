// src/models/userModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const User = sequelize.define("User", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING(255), allowNull: false, unique: true, validate: { isEmail: true } },
  password_hash: { type: DataTypes.TEXT, allowNull: false },
  role: {
    type: DataTypes.ENUM("PATIENT", "DOCTOR", "NURSE", "PHARMACIST", "RECEPTIONIST", "ADMIN"),
    allowNull: false,
  },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: "users", timestamps: false });

export default User;
