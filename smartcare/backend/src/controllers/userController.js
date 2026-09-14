// src/controllers/userController.js
import User from "../models/userModel.js";

// CREATE User
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ All Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password_hash"],
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ Single User
export const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: {
        exclude: ["password_hash"],
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (req.user.role !== "ADMIN" && req.user.id !== user.id) {
      return res.status(403).json({
        error: "Forbidden: cannot view other users",
      });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE User
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.update(req.body);

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE User
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({
      message: "User deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
