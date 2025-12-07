import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Booking() {
  const nav = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    room: "",
    checkIn: "",
    checkOut: "",
    guests: 1
  });

  async function loadData() {
    const r = await api.get("/rooms");
    setRooms(r.data);

    const b = await api.get("/bookings");
    setBookings(b.data);
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function bookRoom(e) {
    e.preventDefault();

    try {
      await api.post("/bookings", form);
      alert("Room booked!");
      loadData();
    } catch (err) {
      alert("Failed: " + (err.response?.data?.message || "Error"));
    }
  }

  async function checkIn(id) {
    await api.put(`/bookings/checkin/${id}`);
    alert("Guest checked-in!");
    loadData();
  }

  async function checkOut(id) {
    await api.put(`/bookings/checkout/${id}`);
    alert("Guest checked-out!");
    loadData();
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 p-5">
      <h2 className="text-3xl font-bold mb-6">Book a Room</h2>

      {/* FORM */}
      <form
        onSubmit={bookRoom}
        className="bg-white shadow-md rounded-lg p-6 mb-10"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            name="customerName"
            placeholder="Customer Name"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            name="customerPhone"
            placeholder="Phone"
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <select
            name="room"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Room</option>
            {rooms.map((r) => (
              <option key={r._id} value={r._id}>
                {r.roomNumber} — {r.type?.name}
              </option>
            ))}
          </select>

          <input type="date" name="checkIn" onChange={handleChange} className="border p-3 rounded" />

          <input type="date" name="checkOut" onChange={handleChange} className="border p-3 rounded" />

          <input
            name="guests"
            type="number"
            min="1"
            placeholder="Guests"
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>

        <button className="mt-5 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Book
        </button>
      </form>

      {/* TABLE */}
      <h3 className="text-2xl font-semibold mb-3">All Bookings</h3>

      <div className="overflow-x-auto">
        <table className="w-full border shadow-lg rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Room</th>
              <th className="p-3">Dates</th>
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Invoice</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{b.customerName}</td>
                <td className="p-3">{b.customerPhone}</td>
                <td className="p-3">{b.room?.roomNumber}</td>
                <td className="p-3">
                  {b.checkIn.slice(0, 10)} → {b.checkOut.slice(0, 10)}
                </td>
                <td className="p-3">{b.status}</td>

                {/* PAYMENT STATUS */}
                <td className="p-3">
                  {b.paymentStatus === "paid" ? (
                    <span className="text-green-600 font-semibold">Paid ✔</span>
                  ) : (
                    <button
                      onClick={() => nav(`/payment/${b._id}`)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
                    >
                      Pay Now
                    </button>
                  )}
                </td>

                {/* INVOICE */}
                <td className="p-3">
                  {b.status === "checked-out" ? (
                    <button
                      onClick={() => nav(`/invoice/${b._id}`)}
                      className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700"
                    >
                      Invoice
                    </button>
                  ) : (
                    "—"
                  )}
                </td>

                {/* CHECK-IN / CHECK-OUT */}
                <td className="p-3">
                  {b.status === "booked" && (
                    <button
                      onClick={() => checkIn(b._id)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
                    >
                      Check-in
                    </button>
                  )}

                  {b.status === "checked-in" && (
                    <button
                      onClick={() => checkOut(b._id)}
                      className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                    >
                      Check-out
                    </button>
                  )}

                  {b.status === "checked-out" && (
                    <span className="text-blue-600 font-semibold">Completed ✔</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Booking;
