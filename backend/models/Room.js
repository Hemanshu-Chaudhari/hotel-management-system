import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: true
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoomType",
    required: true
  },
  status: {
    type: String,
    enum: ["available", "occupied", "cleaning", "maintenance"],
    default: "available"
  }
}, { timestamps: true });

export default mongoose.model("Room", roomSchema);
