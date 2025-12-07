import { useEffect, useState } from "react";
import api from "../api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    booked: 0,
    checkedIn: 0,
    checkedOut: 0,
    revenueToday: 0,
  });

  async function loadStats() {
    try {
      const res = await api.get("/dashboard/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">Dashboard</h1>

      {/* CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Total Rooms */}
        <div className="bg-white shadow-lg rounded-xl p-5 border-l-4 border-blue-600">
          <h2 className="text-lg text-gray-500">Total Rooms</h2>
          <p className="text-4xl font-bold text-blue-700">{stats.totalRooms}</p>
        </div>

        {/* Available */}
        <div className="bg-white shadow-lg rounded-xl p-5 border-l-4 border-green-600">
          <h2 className="text-lg text-gray-500">Available Rooms</h2>
          <p className="text-4xl font-bold text-green-700">{stats.availableRooms}</p>
        </div>

        {/* Booked */}
        <div className="bg-white shadow-lg rounded-xl p-5 border-l-4 border-yellow-500">
          <h2 className="text-lg text-gray-500">Booked</h2>
          <p className="text-4xl font-bold text-yellow-600">{stats.booked}</p>
        </div>
      </div>

      {/* SECOND ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">

        {/* Checked In */}
        <div className="bg-white shadow-lg rounded-xl p-5 border-l-4 border-purple-600">
          <h2 className="text-lg text-gray-500">Checked-In</h2>
          <p className="text-4xl font-bold text-purple-700">{stats.checkedIn}</p>
        </div>

        {/* Checked Out */}
        <div className="bg-white shadow-lg rounded-xl p-5 border-l-4 border-red-600">
          <h2 className="text-lg text-gray-500">Checked-Out</h2>
          <p className="text-4xl font-bold text-red-700">{stats.checkedOut}</p>
        </div>

        {/* Revenue */}
        <div className="bg-white shadow-lg rounded-xl p-5 border-l-4 border-indigo-600">
          <h2 className="text-lg text-gray-500">Today’s Revenue</h2>
          <p className="text-4xl font-bold text-indigo-700">₹{stats.revenueToday}</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-4 gap-5">
        <a
          href="/booking"
          className="bg-blue-600 text-white p-4 rounded-xl text-center font-semibold hover:bg-blue-700"
        >
          ➕ New Booking
        </a>

        <a
          href="/rooms"
          className="bg-indigo-600 text-white p-4 rounded-xl text-center font-semibold hover:bg-indigo-700"
        >
          🏨 Manage Rooms
        </a>

        <a
          href="/room-types"
          className="bg-purple-600 text-white p-4 rounded-xl text-center font-semibold hover:bg-purple-700"
        >
          🛏 Manage Room Types
        </a>

        <a
          href="/search"
          className="bg-green-600 text-white p-4 rounded-xl text-center font-semibold hover:bg-green-700"
        >
          🔍 Search Bookings
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
