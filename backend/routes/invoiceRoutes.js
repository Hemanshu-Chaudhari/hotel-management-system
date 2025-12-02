import express from "express";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const UPI_ID = "yourupiid@okaxis"; // CHANGE THIS
const RECEIVER_NAME = "Hotel Name";

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate({ path: "room", populate: { path: "type" } });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const price = booking.room.type.price;

    const checkIn = new Date(booking.checkIn);
    const checkOut = new Date(booking.checkOut);

    const nights = Math.ceil(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24)
    );

    const amount = nights * price;
    const tax = amount * 0.12;
    const total = amount + tax;

    // 🔥 Generate UPI link
    const upiString = `upi://pay?pa=${UPI_ID}&pn=${encodeURIComponent(
      RECEIVER_NAME
    )}&am=${total}&cu=INR`;

    // 🔥 Generate QR
    const qr = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
      upiString
    )}`;

    res.json({
      booking,
      price,
      nights,
      amount,
      tax,
      total,
      upiString,
      qr,
    });
  } catch (err) {
    console.error("Invoice error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
