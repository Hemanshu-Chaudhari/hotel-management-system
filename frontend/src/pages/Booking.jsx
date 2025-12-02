import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  const [isLoading, setIsLoading] = useState(false);

  async function loadData() {
    try {
      const r = await api.get("/rooms");
      setRooms(r.data.filter(room => room.status === 'available'));

      const b = await api.get("/bookings");
      setBookings(b.data);
    } catch (err) {
      console.log("Error loading data:", err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function bookRoom(e) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await api.post("/bookings", form);
      alert("Room booked successfully!");
      setForm({
        customerName: "",
        customerPhone: "",
        room: "",
        checkIn: "",
        checkOut: "",
        guests: 1
      });
      loadData();
    } catch (err) {
      alert("Booking failed: " + (err.response?.data?.message || "Please try again"));
    } finally {
      setIsLoading(false);
    }
  }

  async function checkIn(id) {
    try {
      await api.put(`/bookings/checkin/${id}`);
      alert("Guest checked-in successfully!");
      loadData();
    } catch (err) {
      alert("Check-in failed");
    }
  }

  async function checkOut(id) {
    try {
      await api.put(`/bookings/checkout/${id}`);
      alert("Guest checked-out successfully!");
      loadData();
    } catch (err) {
      alert("Check-out failed");
    }
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-saffron-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-saffron-500 to-green-500 rounded-xl flex items-center justify-center">
              <span className="text-2xl text-white">📅</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Room Booking
              </h1>
              <p className="text-gray-600">Manage reservations and guest check-ins</p>
            </div>
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-saffron-500 to-amber-600 p-6">
              <h2 className="text-2xl font-bold text-white">New Reservation</h2>
              <p className="text-amber-100">Book a room for your guest</p>
            </div>

            <form onSubmit={bookRoom} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Customer Name */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Guest Name
                  </label>
                  <div className="relative">
                    <input
                      name="customerName"
                      placeholder="Enter guest name"
                      value={form.customerName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-12 bg-amber-50/50 border-2 border-amber-200 
                               rounded-xl focus:border-saffron-500 focus:ring-2 focus:ring-saffron-100 
                               focus:outline-none transition-all group-hover:border-amber-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <span>👤</span>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <input
                      name="customerPhone"
                      placeholder="Enter phone number"
                      value={form.customerPhone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-12 bg-amber-50/50 border-2 border-amber-200 
                               rounded-xl focus:border-saffron-500 focus:ring-2 focus:ring-saffron-100 
                               focus:outline-none transition-all group-hover:border-amber-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <span>📱</span>
                    </div>
                  </div>
                </div>

                {/* Room Selection */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Room
                  </label>
                  <div className="relative">
                    <select
                      name="room"
                      value={form.room}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-12 bg-amber-50/50 border-2 border-amber-200 
                               rounded-xl focus:border-saffron-500 focus:ring-2 focus:ring-saffron-100 
                               focus:outline-none transition-all appearance-none group-hover:border-amber-300"
                    >
                      <option value="">Choose a room</option>
                      {rooms.map((r) => (
                        <option key={r._id} value={r._id}>
                          {r.roomNumber} • {r.type?.name} • ₹{r.type?.price}/night
                        </option>
                      ))}
                    </select>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <span>🏨</span>
                    </div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <span>▼</span>
                    </div>
                  </div>
                </div>

                {/* Check-in Date */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="checkIn"
                      value={form.checkIn}
                      onChange={handleChange}
                      min={today}
                      required
                      className="w-full px-4 py-3 pl-12 bg-amber-50/50 border-2 border-amber-200 
                               rounded-xl focus:border-saffron-500 focus:ring-2 focus:ring-saffron-100 
                               focus:outline-none transition-all group-hover:border-amber-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <span>📅</span>
                    </div>
                  </div>
                </div>

                {/* Check-out Date */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="checkOut"
                      value={form.checkOut}
                      onChange={handleChange}
                      min={form.checkIn || tomorrow}
                      required
                      className="w-full px-4 py-3 pl-12 bg-amber-50/50 border-2 border-amber-200 
                               rounded-xl focus:border-saffron-500 focus:ring-2 focus:ring-saffron-100 
                               focus:outline-none transition-all group-hover:border-amber-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <span>🏠</span>
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Guests
                  </label>
                  <div className="relative">
                    <input
                      name="guests"
                      type="number"
                      min="1"
                      max="10"
                      placeholder="Number of guests"
                      value={form.guests}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-12 bg-amber-50/50 border-2 border-amber-200 
                               rounded-xl focus:border-saffron-500 focus:ring-2 focus:ring-saffron-100 
                               focus:outline-none transition-all group-hover:border-amber-300"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <span>👨‍👩‍👧‍👦</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full md:w-auto px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg
                           ${isLoading 
                             ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                             : 'bg-gradient-to-r from-saffron-500 to-amber-600 text-white hover:shadow-xl hover:from-saffron-600 hover:to-amber-700'
                           } transition-all duration-300 flex items-center justify-center gap-3`}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Booking...
                    </>
                  ) : (
                    <>
                      <span>✨</span>
                      Book Room
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* Bookings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-200 overflow-hidden">
            {/* Table Header */}
            <div className="bg-gradient-to-r from-saffron-500 to-amber-600 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">All Bookings</h2>
                  <p className="text-amber-100">Manage guest reservations</p>
                </div>
                <div className="text-white bg-saffron-700/30 px-4 py-2 rounded-lg">
                  {bookings.length} Bookings
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-amber-50 border-b border-amber-200">
                    <th className="p-4 text-left font-semibold text-gray-700">Guest</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Phone</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Room</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Dates</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Status</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Payment</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Invoice</th>
                    <th className="p-4 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b) => (
                    <motion.tr 
                      key={b._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-amber-100 hover:bg-amber-50/50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-medium text-gray-800">{b.customerName}</div>
                        <div className="text-sm text-gray-500">{b.guests} guest(s)</div>
                      </td>
                      
                      <td className="p-4">
                        <div className="font-medium text-gray-800">{b.customerPhone}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-medium text-gray-800">{b.room?.roomNumber}</div>
                        <div className="text-sm text-gray-500">{b.room?.type?.name}</div>
                      </td>

                      <td className="p-4">
                        <div className="font-medium text-gray-800">
                          {new Date(b.checkIn).toLocaleDateString('en-IN')}
                        </div>
                        <div className="text-sm text-gray-500">to</div>
                        <div className="font-medium text-gray-800">
                          {new Date(b.checkOut).toLocaleDateString('en-IN')}
                        </div>
                      </td>

                      <td className="p-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
                          b.status === 'booked' ? 'bg-blue-100 text-blue-800' :
                          b.status === 'checked-in' ? 'bg-green-100 text-green-800' :
                          b.status === 'checked-out' ? 'bg-gray-100 text-gray-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status.toUpperCase()}
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="p-4">
                        {b.paymentStatus === "paid" ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-green-600 font-semibold">Paid</span>
                          </div>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => nav(`/payment/${b._id}`)}
                            className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 
                                     text-white rounded-lg hover:shadow-lg transition-all"
                          >
                            Pay Now
                          </motion.button>
                        )}
                      </td>

                      {/* Invoice */}
                      <td className="p-4">
                        {b.status === "checked-out" ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => nav(`/invoice/${b._id}`)}
                            className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 
                                     text-white rounded-lg hover:shadow-lg transition-all"
                          >
                            Invoice
                          </motion.button>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4">
                        <div className="flex gap-2">
                          {b.status === "booked" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => checkIn(b._id)}
                              className="px-4 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 
                                       text-white rounded-lg hover:shadow-lg transition-all"
                            >
                              Check-in
                            </motion.button>
                          )}

                          {b.status === "checked-in" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => checkOut(b._id)}
                              className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-rose-600 
                                       text-white rounded-lg hover:shadow-lg transition-all"
                            >
                              Check-out
                            </motion.button>
                          )}

                          {b.status === "checked-out" && (
                            <span className="px-4 py-1.5 bg-gray-100 text-gray-700 rounded-lg">
                              Completed
                            </span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {bookings.length === 0 && (
              <div className="p-8 text-center">
                <div className="text-4xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
                <p className="text-gray-500">Create your first booking using the form above</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Booking;