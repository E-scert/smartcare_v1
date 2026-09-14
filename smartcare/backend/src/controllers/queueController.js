// src/controllers/queueController.js
import Queue from "../models/queueModel.js";

// CREATE Queue entry
export const createQueue = async (req, res) => {
  try {
    const queue = await Queue.create(req.body);
    res.status(201).json(queue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ All Queue entries
export const getQueueEntries = async (req, res) => {
  try {
    const queues = await Queue.findAll();
    res.json(queues);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ Single Queue entry
export const getQueueById = async (req, res) => {
  try {
    const queue = await Queue.findByPk(req.params.id);
    if (!queue) return res.status(404).json({ error: "Queue entry not found" });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE Queue entry
export const updateQueue = async (req, res) => {
  try {
    const queue = await Queue.findByPk(req.params.id);
    if (!queue) return res.status(404).json({ error: "Queue entry not found" });
    await queue.update(req.body);
    res.json(queue);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE Queue entry
export const deleteQueue = async (req, res) => {
  try {
    const queue = await Queue.findByPk(req.params.id);
    if (!queue) return res.status(404).json({ error: "Queue entry not found" });
    await queue.destroy();
    res.json({ message: "Queue entry deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
