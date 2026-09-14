// src/config/db.js
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
    logging: process.env.DB_LOGGING === "true", // set DB_LOGGING=true in .env to see SQL queries
    dialectOptions: {
      // Required by most managed Postgres hosts (Render, Railway, Supabase, RDS, etc.)
      // Disabled automatically for local development.
      ssl:
        process.env.DB_SSL === "true"
          ? { require: true, rejectUnauthorized: false }
          : false,
    },
  }
);

export default sequelize;
