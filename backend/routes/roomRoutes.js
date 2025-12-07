import express from "express";
import RoomType from "../models/RoomType.js";
import Room from "../models/Room.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ------------------ ROOM TYPES ------------------

// Add Room Type
router.post("/type", authMiddleware, async (req, res) => {
  try {
    const { name, price, maxGuests, features } = req.body;

    const type = new RoomType({ name, price, maxGuests, features });
    await type.save();

    res.json({ message: "Room type added", type });
  } catch (err) {
    console.error("Add Room Type Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Room Types
router.get("/type", async (req, res) => {
  const types = await RoomType.find();
  res.json(types);
});

// Delete Room Type
router.delete("/type/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await RoomType.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Room type not found" });
    }

    res.json({ message: "Room type deleted" });
  } catch (err) {
    console.error("Delete Room Type Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ------------------ ROOMS ------------------

// Add new room
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { roomNumber, type, status } = req.body;

    const room = new Room({ roomNumber, type, status });
    await room.save();

    res.json({ message: "Room added", room });
  } catch (err) {
    console.error("Add Room Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all rooms
router.get("/", async (req, res) => {
  const rooms = await Room.find().populate("type");
  res.json(rooms);
});

// Update room status
router.put("/status/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Room.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ message: "Room status updated", updated });
  } catch (err) {
    console.error("Update Room Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete Room
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Room.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Room not found" });
    }

    res.json({ message: "Room deleted" });
  } catch (err) {
    console.error("Delete Room Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
