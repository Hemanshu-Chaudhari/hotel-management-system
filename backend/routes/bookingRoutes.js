import express from "express";
import Booking from "../models/Booking.js";
import Room from "../models/Room.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Booking
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { customerName, customerPhone, room, checkIn, checkOut, guests } = req.body;

        // Mark room as occupied
        await Room.findByIdAndUpdate(room, { status: "occupied" });

        const booking = new Booking({
            customerName,
            customerPhone,
            room,
            checkIn,
            checkOut,
            guests
        });

        await booking.save();

        res.json({ message: "Booking created", booking });

    } catch (err) {
        console.error("Booking Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

// Get All Bookings
router.get("/", authMiddleware, async (req, res) => {
    const bookings = await Booking.find().populate("room");
    res.json(bookings);
});

// Check-in booking
router.put("/checkin/:id", authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        booking.status = "checked-in";
        await booking.save();

        // room occupied
        await Room.findByIdAndUpdate(booking.room, { status: "occupied" });

        res.json({ message: "Guest checked-in!", booking });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Check-out booking
router.put("/checkout/:id", authMiddleware, async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) return res.status(404).json({ message: "Booking not found" });

        booking.status = "checked-out";
        await booking.save();

        // room becomes available again
        await Room.findByIdAndUpdate(booking.room, { status: "available" });

        res.json({ message: "Guest checked-out!", booking });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// 🔥 PAYMENT UPDATE ROUTE (Important)
router.put("/payment/:id", authMiddleware, async (req, res) => {
    try {
        const { paymentStatus, paymentMethod, paidAmount, paymentDate } = req.body;

        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            {
                paymentStatus,
                paymentMethod,
                paidAmount,
                paymentDate
            },
            { new: true }
        );

        res.json({ message: "Payment updated", booking });
    } catch (err) {
        console.log("Payment Error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
