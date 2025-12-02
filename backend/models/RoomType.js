import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  maxGuests: {
    type: Number,
    required: true
  },
  features: [
    {
      type: String
    }
  ]
}, { timestamps: true });

export default mongoose.model("RoomType", roomTypeSchema);
