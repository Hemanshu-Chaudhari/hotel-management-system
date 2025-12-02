import express from "express";
import Room from "../models/Room.js";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ status: "available" });
    const occupiedRooms = await Room.countDocuments({ status: "occupied" });
    const cleaningRooms = await Room.countDocuments({ status: "cleaning" });

    // Today's date range
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

    // Today's bookings
    const todaysBookings = await Booking.countDocuments({
      checkIn: { $gte: start, $lt: end }
    });

    // Upcoming check-ins (future bookings)
    const upcomingCheckIns = await Booking.find({
      checkIn: { $gt: today }
    }).populate("room");

    // Upcoming check-outs (future)
    const upcomingCheckOuts = await Booking.find({
      checkOut: { $gt: today }
    }).populate("room");

    res.json({
      totalRooms,
      availableRooms,
      occupiedRooms,
      cleaningRooms,
      todaysBookings,
      upcomingCheckIns,
      upcomingCheckOuts
    });

  } catch (err) {
    console.error("Dashboard API Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
