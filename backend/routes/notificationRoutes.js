import express from "express";
import Notification from "../models/Notification.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const noti = await Notification.find().sort({ date: -1 });
  res.json(noti);
});

export default router;
