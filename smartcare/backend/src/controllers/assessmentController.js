// src/controllers/assessmentController.js
import Assessment from "../models/assessmentModel.js";
import { findPatientByUserId } from "../utils/resolvePatient.js";

// CREATE Assessment
export const createAssessment = async (req, res) => {
  try {
    const payload = { ...req.body };

    if (req.user.role === "PATIENT") {
      const patient = await findPatientByUserId(req.user.id);
      if (!patient) {
        return res.status(400).json({
          error:
            "No patient profile found for this account. Complete patient registration first.",
        });
      }
      payload.patient_id = patient.id;
    }

    const symptoms = payload.symptoms || {};

    let calculatedPriority = "STANDARD";
    let calculatedService = "General Practice";

    if (
      symptoms.chestPain ||
      symptoms.difficultyBreathing ||
      symptoms.severeBleeding
    ) {
      calculatedPriority = "HIGH";
      calculatedService = "Emergency";
    } else if (symptoms.collectingMedication) {
      calculatedPriority = "STANDARD";
      calculatedService = "Pharmacy";
    } else if (symptoms.fluSymptoms) {
      calculatedPriority = "MEDIUM";
      calculatedService = "General Practice";
    }

    const assessment = await Assessment.create(payload);
    payload.priority_level = calculatedPriority;
    payload.recommended_service = calculatedService;
    res.status(201).json(assessment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ All Assessments
export const getAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.findAll();
    res.json(assessments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ Single Assessment
export const getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findByPk(req.params.id);
    if (!assessment)
      return res.status(404).json({ error: "Assessment not found" });

    if (req.user.role === "PATIENT") {
      const patient = await findPatientByUserId(req.user.id);
      if (!patient || patient.id !== assessment.patient_id) {
        return res.status(403).json({
          error: "Forbidden: cannot view other patients' assessments",
        });
      }
    }

    res.json(assessment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Assessment
export const updateAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByPk(req.params.id);
    if (!assessment)
      return res.status(404).json({ error: "Assessment not found" });
    await assessment.update(req.body);
    res.json(assessment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Assessment
export const deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findByPk(req.params.id);
    if (!assessment)
      return res.status(404).json({ error: "Assessment not found" });
    await assessment.destroy();
    res.json({ message: "Assessment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
