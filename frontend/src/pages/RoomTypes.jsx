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

  async function loadTypes() {
    try {
      setIsLoading(true);
      const res = await api.get("/rooms/types");
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

  async function addRoomType(e) {
    e.preventDefault();
    try {
      await api.post("/rooms/types", {
        name: form.name,
        price: form.price,
        maxGuests: form.maxGuests,
        features: form.features.split(",").map(f => f.trim()).filter(f => f),
      });

      setForm({ name: "", price: "", maxGuests: "", features: "" });
      setIsFormVisible(false);
      loadTypes();
      
      // Show toast notification
      showToast("Room type added successfully", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Error adding type", "error");
    }
  }

  async function deleteType(id) {
    if (!window.confirm("Are you sure you want to delete this room type?")) return;

    try {
      await api.delete(`/rooms/types/${id}`);
      setRoomTypes(prev => prev.filter(rt => rt._id !== id));
      showToast("Room type deleted successfully", "success");
    } catch (err) {
      showToast("Error deleting room type", "error");
    }
  }

  function showToast(message, type = "info") {
    // Implement your toast notification system here
    alert(message); // Placeholder
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Room Types
              </h1>
              <p className="text-gray-600">
                Manage and configure your hotel's room offerings
              </p>
            </div>
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-2 group"
            >
              <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {isFormVisible ? "Cancel" : "Add Room Type"}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Room Types</p>
                  <p className="text-3xl font-bold text-gray-900">{roomTypes.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Average Price</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ₹{roomTypes.length > 0 
                      ? Math.round(roomTypes.reduce((acc, rt) => acc + parseFloat(rt.price), 0) / roomTypes.length)
                      : "0"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Capacity</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {roomTypes.reduce((acc, rt) => acc + parseInt(rt.maxGuests), 0)} Guests
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1.205a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Room Type
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Deluxe Suite"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price / Night
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500 font-medium">₹</span>
                        <input
                          name="price"
                          type="number"
                          value={form.price}
                          onChange={handleChange}
                          placeholder="9999"
                          className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                          required
                          min="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Guests
                      </label>
                      <input
                        name="maxGuests"
                        type="number"
                        value={form.maxGuests}
                        onChange={handleChange}
                        placeholder="4"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                        required
                        min="1"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Features
                      </label>
                      <input
                        name="features"
                        value={form.features}
                        onChange={handleChange}
                        placeholder="Sea View, AC, Mini Bar"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-medium rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                    >
                      Create Room Type
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Room Types Grid */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">All Room Types</h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-[280px]"></div>
                </div>
              ))}
            </div>
          ) : roomTypes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No room types yet</h3>
              <p className="text-gray-500 mb-6">Get started by creating your first room type</p>
              <button
                onClick={() => setIsFormVisible(true)}
                className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
              >
                Create Room Type
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {roomTypes.map((rt, index) => (
                  <motion.div
                    key={rt._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                      {/* Card Header with Gradient */}
                      <div className="relative h-2 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
                      
                      <div className="p-6 flex-1">
                        {/* Room Type Header */}
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                            {rt.name}
                          </h3>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm font-medium rounded-full">
                            {rt.maxGuests} Guests
                          </span>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                          <div className="text-3xl font-bold text-gray-900 mb-1">
                            ₹{rt.price}
                            <span className="text-sm font-normal text-gray-500"> / night</span>
                          </div>
                          <p className="text-sm text-gray-500">Excluding taxes</p>
                        </div>

                        {/* Features */}
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Features</h4>
                          <div className="flex flex-wrap gap-2">
                            {rt.features.map((f, i) => (
                              <span
                                key={i}
                                className="px-3 py-1.5 bg-gray-50 text-gray-700 text-sm rounded-lg border border-gray-200"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Card Footer */}
                      <div className="p-6 pt-0 border-t border-gray-100">
                        <button
                          onClick={() => deleteType(rt._id)}
                          className="w-full py-2.5 px-4 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group/delete"
                        >
                          <svg className="w-4 h-4 group-hover/delete:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Selection color */
        ::selection {
          background-color: #10b981;
          color: white;
        }
        
        /* Card hover effect */
        .group:hover .group-hover\\:shadow-lg {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        /* Smooth transitions */
        * {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 150ms;
        }
      `}</style>
    </div>
  );
}

export default RoomTypes;