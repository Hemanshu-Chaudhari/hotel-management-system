// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ------------------------------
// DIRECT MongoDB Atlas Connection (No .env)
// ------------------------------

const MONGO_URI ="mongodb+srv://hemanshu:hemanshu@cluster0.0yh5oie.mongodb.net/hotel_management?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB connected successfully (Atlas)");
  } catch (err) {
    console.error("DB connection error:", err);
  }
}
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hotel Management Backend running...");
});

app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/payment", paymentRoutes);

// PORT (Render assigns automatically)
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
