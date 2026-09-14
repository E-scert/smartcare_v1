// src/controllers/appointmentController.js
import Appointment from "../models/appointmentModel.js";
import { findPatientByUserId } from "../utils/resolvePatient.js";

// CREATE Appointment
export const createAppointment = async (req, res) => {
  try {
    const payload = { ...req.body };

    // A patient can only ever book for themselves — resolve their own
    // patient record server-side rather than trusting a patient_id sent
    // from the client (which would let one patient book as another).
    if (req.user.role === "PATIENT") {
      const patient = await findPatientByUserId(req.user.id);
      if (!patient) {
        return res.status(400).json({ error: "No patient profile found for this account. Complete patient registration first." });
      }
      payload.patient_id = patient.id;
    }

    const appointment = await Appointment.create(payload);
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ All Appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ Single Appointment
export const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });

    if (req.user.role === "PATIENT") {
      const patient = await findPatientByUserId(req.user.id);
      if (!patient || patient.id !== appointment.patient_id) {
        return res.status(403).json({ error: "Forbidden: cannot view other patients' appointments" });
      }
    }

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Appointment
export const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    await appointment.update(req.body);
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Appointment
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByPk(req.params.id);
    if (!appointment) return res.status(404).json({ error: "Appointment not found" });
    await appointment.destroy();
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
