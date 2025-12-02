import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    paymentStatus: {
  type: String,
  enum: ["pending", "paid"],
  default: "pending"
},

paymentMethod: {
  type: String,
  enum: ["cash", "upi", "card", "netbanking", null],
  default: null
},

paidAmount: {
  type: Number,
  default: 0
},

paymentDate: {
  type: Date,
  default: null
}
,
  customerName: {
    type: String,
    required: true
  },
  customerPhone: {
    type: String,
    required: true
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  guests: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["booked", "checked-in", "checked-out", "cancelled"],
    default: "booked"
  }
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
