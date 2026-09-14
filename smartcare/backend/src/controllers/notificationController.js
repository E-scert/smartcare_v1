// src/controllers/notificationController.js
import Notification from "../models/notificationModel.js";
import { findPatientByUserId } from "../utils/resolvePatient.js";

// CREATE Notification
export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ All Notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ Single Notification
export const getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });

    if (req.user.role === "PATIENT") {
      const patient = await findPatientByUserId(req.user.id);
      if (!patient || patient.id !== notification.patient_id) {
        return res.status(403).json({ error: "Forbidden: cannot view other patients' notifications" });
      }
    }

    res.json(notification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Notification
export const updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });
    await notification.update(req.body);
    res.json(notification);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id);
    if (!notification) return res.status(404).json({ error: "Notification not found" });
    await notification.destroy();
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
