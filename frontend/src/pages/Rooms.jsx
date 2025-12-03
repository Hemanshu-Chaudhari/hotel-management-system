import { useEffect, useState } from "react";
import api from "../api";
import { motion, AnimatePresence } from "framer-motion";

function Rooms() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    roomNumber: "",
    type: "",
    status: "available",
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState("all");

  // ------------------------------------------
  // LOAD DATA (ROOM TYPES + ROOMS)
  // ------------------------------------------
  async function loadData() {
    try {
      setIsLoading(true);
      const [t, r] = await Promise.all([
        api.get("/rooms/type"),  // ✔ right route
        api.get("/rooms"),
      ]);

      setRoomTypes(t.data);
      setRooms(r.data);
    } catch (err) {
      console.error("Error loading:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ------------------------------------------
  // ADD ROOM
  // ------------------------------------------
  async function addRoom(e) {
    e.preventDefault();
    try {
      await api.post("/rooms", form);
      alert("Room added!");
      setForm({ roomNumber: "", type: "", status: "available" });
      setIsFormVisible(false);
      loadData();
    } catch (err) {
      alert("Error adding room");
    }
  }

  // ------------------------------------------
  // DELETE ROOM
  // ------------------------------------------
  async function deleteRoom(id) {
    if (!window.confirm("Delete this room?")) return;

    try {
      await api.delete(`/rooms/${id}`);
      setRooms((prev) => prev.filter((r) => r._id !== id));
      alert("Room deleted");
    } catch (err) {
      alert("Error deleting");
    }
  }

  const filteredRooms =
    filter === "all" ? rooms : rooms.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Room Management</h1>
          <button
            onClick={() => setIsFormVisible(!isFormVisible)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl"
          >
            {isFormVisible ? "Cancel" : "Add Room"}
          </button>
        </div>

        {/* ADD ROOM FORM */}
        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-10 bg-white border p-6 rounded-xl shadow"
            >
              <form onSubmit={addRoom} className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* ROOM NUMBER */}
                <div>
                  <label className="block font-semibold mb-2">Room Number</label>
                  <input
                    name="roomNumber"
                    value={form.roomNumber}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-xl"
                  />
                </div>

                {/* ROOM TYPE */}
                <div>
                  <label className="block font-semibold mb-2">Room Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border rounded-xl"
                  >
                    <option value="">Select</option>
                    {roomTypes.map((rt) => (
                      <option key={rt._id} value={rt._id}>
                        {rt.name} — ₹{rt.price}
                      </option>
                    ))}
                  </select>
                </div>

                {/* STATUS */}
                <div>
                  <label className="block font-semibold mb-2">Status</label>
                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl"
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                <div className="col-span-full flex justify-end">
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-xl">
                    Create Room
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FILTER BUTTONS */}
        <div className="flex gap-3 mb-6">
          <button onClick={() => setFilter("all")} className="px-4 py-2 bg-gray-200 rounded">
            All
          </button>
          <button onClick={() => setFilter("available")} className="px-4 py-2 bg-green-200 rounded">
            Available
          </button>
          <button onClick={() => setFilter("occupied")} className="px-4 py-2 bg-red-200 rounded">
            Occupied
          </button>
          <button onClick={() => setFilter("maintenance")} className="px-4 py-2 bg-yellow-200 rounded">
            Maintenance
          </button>
        </div>

        {/* ROOMS LIST */}
        {isLoading ? (
          <p>Loading rooms...</p>
        ) : filteredRooms.length === 0 ? (
          <p>No rooms found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div key={room._id} className="bg-white border p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold">
                  Room {room.roomNumber}
                </h3>

                <p className="text-gray-600 mt-2">
                  Type: <strong>{room.type?.name}</strong>
                </p>

                <p className="text-gray-600">
                  Price: ₹{room.type?.price}
                </p>

                <p className="text-gray-600">
                  Guests: {room.type?.maxGuests}
                </p>

                <p className="text-gray-600">
                  Status: <strong>{room.status}</strong>
                </p>

                <button
                  onClick={() => deleteRoom(room._id)}
                  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-xl"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Rooms;
