import { useEffect, useState } from "react";
import api from "../api";

function Rooms() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    status: "available"
  });

  // Load Room Types + Rooms
  async function loadData() {
    try {
      // ✔ Correct backend route for room types
      const t = await api.get("/rooms/type");
      setRoomTypes(t.data);

      const r = await api.get("/rooms");
      setRooms(r.data);
    } catch (err) {
      console.error("Load Data Error:", err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Add Room
  async function addRoom(e) {
    e.preventDefault();

    try {
      await api.post(
        "/rooms",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );

      setForm({
        roomNumber: "",
        type: "",
        status: "available"
      });

      loadData();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding room");
    }
  }

  // Delete Room
  async function deleteRoom(id) {
    if (!confirm("Delete this room?")) return;

    try {
      await api.delete(`/rooms/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      loadData();
    } catch (err) {
      alert("Error deleting room");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Room Management</h1>

      {/* ADD ROOM FORM */}
      <div className="bg-white p-5 shadow-lg rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">➕ Add Room</h2>

        <form onSubmit={addRoom} className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ROOM NUMBER */}
          <input
            name="roomNumber"
            placeholder="Room Number"
            value={form.roomNumber}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          {/* ROOM TYPE SELECT */}
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="">Select Type</option>
            {roomTypes.map((rt) => (
              <option key={rt._id} value={rt._id}>
                {rt.name}
              </option>
            ))}
          </select>

          {/* STATUS */}
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="maintenance">Maintenance</option>
          </select>

          {/* SUBMIT */}
          <button className="bg-blue-600 text-white py-3 rounded col-span-full hover:bg-blue-700">
            Add Room
          </button>
        </form>
      </div>

      {/* ROOM LIST */}
      <h2 className="text-2xl font-semibold mb-4">All Rooms</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room._id}
            className="bg-white p-5 shadow rounded-xl border hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-gray-700">
              Room {room.roomNumber}
            </h3>

            <p className="mb-1">
              <b>Type:</b> {room.type?.name}
            </p>

            <p className="mb-3">
              <b>Status:</b>{" "}
              <span
                className={`px-3 py-1 rounded-full text-white text-sm
                ${
                  room.status === "available"
                    ? "bg-green-600"
                    : room.status === "occupied"
                    ? "bg-red-600"
                    : "bg-yellow-500"
                }`}
              >
                {room.status}
              </span>
            </p>

            <button
              onClick={() => deleteRoom(room._id)}
              className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
