// src/controllers/staffController.js
import Staff from "../models/staffModel.js";

// CREATE Staff
export const createStaff = async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ All Staff
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.findAll();
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ Single Staff
export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ error: "Staff not found" });

    if (req.user.role !== "ADMIN" && req.user.id !== staff.user_id) {
      return res.status(403).json({
        error: "Forbidden: cannot view other staff records",
      });
    }

    if (req.user.role !== "ADMIN" && req.user.id !== staff.user_id) {
      return res.status(403).json({
        error: "Forbidden: cannot view other staff records",
      });
    }
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Staff
export const updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    await staff.update(req.body);
    res.json(staff);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Staff
export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) return res.status(404).json({ error: "Staff not found" });
    await staff.destroy();
    res.json({ message: "Staff deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
