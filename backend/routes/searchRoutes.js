import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// Search by phone or name
router.get("/", async (req, res) => {
  const { q } = req.query;

  const bookings = await Booking.find({
    $or: [
      { customerPhone: { $regex: q, $options: "i" } },
      { customerName: { $regex: q, $options: "i" } }
    ]
  }).populate("room");

  res.json(bookings);
});

export default router;
