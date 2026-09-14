// src/utils/resolvePatient.js
import Patient from "../models/patientModel.js";

// Looks up the Patient record that belongs to a given User id.
// Appointments/assessments/notifications store patient_id as a foreign key
// to patients.id — NOT users.id — so any code comparing a logged-in user's
// id (from the JWT) against those records must resolve through this first.
export const findPatientByUserId = async (userId) => {
  return Patient.findOne({ where: { user_id: userId } });
};
