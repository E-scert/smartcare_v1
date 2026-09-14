// src/models/assessmentModel.js

// Assessment model blueprint (no DB connection yet)
// const Assessment = {
//   id: "UUID",                   // primary key
//   patient_id: "UUID",           // foreign key to patients
//   symptoms: "json",             // list of symptoms
//   priority_level: "enum",       // HIGH | MEDIUM | STANDARD
//   recommended_service: "string",
//   submitted_at: "timestamp"
// };

// export default Assessment;


// src/models/assessmentModel.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Assessment = sequelize.define("Assessment", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  patient_id: { type: DataTypes.UUID, allowNull: false },
  symptoms: { type: DataTypes.JSON },
  priority_level: { type: DataTypes.ENUM("HIGH","MEDIUM","STANDARD"), defaultValue: "STANDARD" },
  recommended_service: { type: DataTypes.STRING },
  submitted_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { tableName: "assessments", timestamps: false });

export default Assessment;
