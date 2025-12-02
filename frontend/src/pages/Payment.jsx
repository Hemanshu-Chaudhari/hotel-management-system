import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function Payment() {
  const { id } = useParams();
  const nav = useNavigate();

  const [booking, setBooking] = useState(null);
  const [amount, setAmount] = useState(0);
  const [qrUrl, setQrUrl] = useState("");
  const [method, setMethod] = useState("upi");

  const UPI_ID = "9370493479@axl"; // ← YOUR UPI ID

  // Load booking Data
  useEffect(() => {
    async function load() {
      const res = await api.get(`/invoice/${id}`);
      setBooking(res.data.booking);

      setAmount(res.data.total);

      // Create UPI URL
      const upiString = `upi://pay?pa=${UPI_ID}&pn=Hotel&am=${res.data.total}&cu=INR`;

      // Generate QR
      const qr = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        upiString
      )}`;

      setQrUrl(qr);
    }

    load();
  }, [id]);

  // Mark as paid
  async function markPaid() {
    await api.put(`/bookings/payment/${id}`, {
      paymentStatus: "paid",
      paymentMethod: method,
      paidAmount: amount,
      paymentDate: new Date(),
    });

    alert("Payment marked as PAID ✔");
    nav("/booking");
  }

  if (!booking) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Complete Payment</h1>

      {/* CUSTOMER INFO */}
      <div className="bg-white shadow p-6 rounded-lg mb-6">
        <p><b>Name:</b> {booking.customerName}</p>
        <p><b>Phone:</b> {booking.customerPhone}</p>
        <p className="mt-2">
          <b>Total Amount:</b>{" "}
          <span className="text-green-600 font-semibold">₹{amount}</span>
        </p>
      </div>

      {/* QR SECTION – hide if already paid */}
      {booking.paymentStatus !== "paid" && (
        <div className="bg-white shadow p-6 rounded-lg text-center mb-6">
          <h2 className="text-xl font-semibold mb-4">Scan UPI QR</h2>

          <img src={qrUrl} alt="QR" className="mx-auto mb-3 border p-2 rounded" />

          <p className="text-gray-500 text-sm">Scan & Pay using any UPI App</p>
        </div>
      )}

      {/* Payment Method */}
      <div className="bg-white shadow p-6 rounded-lg mb-6">
        <label className="font-semibold">Select Payment Method</label>
        <select
          className="w-full border p-2 rounded mt-2"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <option value="upi">UPI</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="netbanking">Net Banking</option>
        </select>
      </div>

      {/* Button */}
      {booking.paymentStatus === "paid" ? (
        <button
          className="w-full bg-gray-600 text-white py-3 rounded-lg"
          disabled
        >
          Already Paid ✔
        </button>
      ) : (
        <button
          onClick={markPaid}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg"
        >
          Mark as Paid ✔
        </button>
      )}
    </div>
  );
}
