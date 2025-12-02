import express from "express";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/:id/pay", authMiddleware, async (req, res) => {
  try {
    const { method } = req.body; // UPI / Cash / Card

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.paymentMethod = method;
    booking.paymentStatus = "paid";
    booking.paymentDate = new Date();

    await booking.save();

    res.json({ message: "Payment completed", booking });
  } catch (err) {
    console.error("Payment update error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
