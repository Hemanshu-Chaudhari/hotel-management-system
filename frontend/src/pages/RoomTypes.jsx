import { useEffect, useState } from "react";
import api from "../api";
import { motion, AnimatePresence } from "framer-motion";

function RoomTypes() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    price: "",
    maxGuests: "",
    features: ""
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Load Room Types
  async function loadTypes() {
    try {
      setIsLoading(true);
      const res = await api.get("/rooms/type");  // FIXED
      setRoomTypes(res.data);
    } catch (err) {
      console.error("Error loading room types:", err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTypes();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Add Room Type
  async function addRoomType(e) {
    e.preventDefault();
    try {
      await api.post("/rooms/type", {   // FIXED
        name: form.name,
        price: form.price,
        maxGuests: form.maxGuests,
        features: form.features.split(",").map(f => f.trim()).filter(f => f),
      });

      setForm({ name: "", price: "", maxGuests: "", features: "" });
      setIsFormVisible(false);
      loadTypes();

      showToast("Room type added successfully", "success");
    } catch (err) {
      console.log(err);
      showToast("Error adding type", "error");
    }
  }

  // Delete Room Type
  async function deleteType(id) {
    if (!window.confirm("Are you sure you want to delete this room type?")) return;

    try {
      await api.delete(`/rooms/type/${id}`);  // FIXED
      setRoomTypes(prev => prev.filter(rt => rt._id !== id));

      showToast("Room type deleted successfully", "success");
    } catch (err) {
      showToast("Error deleting room type", "error");
    }
  }

  function showToast(message, type = "info") {
    alert(message);  // Simple fallback
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Room Types</h1>
              <p className="text-gray-600">Manage and configure your hotel's room offerings</p>
            </div>

            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 group"
            >
              {isFormVisible ? "Cancel" : "Add Room Type"}
            </button>
          </div>
        </motion.div>

        {/* Add Room Type Form */}
        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-12 overflow-hidden"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Room Type</h2>

                <form onSubmit={addRoomType} className="space-y-8">

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Room Type</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Deluxe Suite"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Price / Night</label>
                      <input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="4500"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Max Guests</label>
                      <input
                        name="maxGuests"
                        type="number"
                        value={form.maxGuests}
                        onChange={handleChange}
                        placeholder="4"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                      <input
                        name="features"
                        value={form.features}
                        onChange={handleChange}
                        placeholder="AC, TV, Wifi"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                    >
                      Create Room Type
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Room Types List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Room Types</h2>

          {isLoading ? (
            <div>Loading...</div>
          ) : roomTypes.length === 0 ? (
            <div>No Room Types</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roomTypes.map((rt) => (
                <motion.div
                  key={rt._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900">{rt.name}</h3>

                  <p className="text-gray-700 text-lg mt-2">
                    ₹{rt.price} / night
                  </p>

                  <p className="text-gray-500 mt-2">Max Guests: {rt.maxGuests}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {rt.features.map((f, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 rounded-lg text-sm">
                        {f}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => deleteType(rt._id)}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default RoomTypes;
