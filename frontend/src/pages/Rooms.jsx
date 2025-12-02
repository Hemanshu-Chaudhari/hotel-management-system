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
    status: "available"
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState("all");

  async function loadData() {
    try {
      setIsLoading(true);
      const [t, r] = await Promise.all([
        api.get("/rooms/types"),
        api.get("/rooms")
      ]);
      setRoomTypes(t.data);
      setRooms(r.data);
    } catch (err) {
      console.error("Error loading data:", err);
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

  async function addRoom(e) {
    e.preventDefault();
    try {
      await api.post("/rooms", form);
      setForm({ roomNumber: "", type: "", status: "available" });
      setIsFormVisible(false);
      loadData();
      showNotification("Room added successfully", "success");
    } catch (err) {
      showNotification(err.response?.data?.message || "Error adding room", "error");
    }
  }

  async function deleteRoom(id) {
    if (!confirm("Are you sure you want to delete this room?")) return;
    
    try {
      await api.delete(`/rooms/${id}`);
      setRooms(prev => prev.filter(room => room._id !== id));
      showNotification("Room deleted successfully", "success");
    } catch (err) {
      showNotification("Error deleting room", "error");
    }
  }

  function showNotification(message, type) {
    // Implement toast notification here
    alert(message); // Placeholder
  }

  const filteredRooms = filter === "all" 
    ? rooms 
    : rooms.filter(room => room.status === filter);

  const statusColors = {
    available: "bg-gradient-to-r from-emerald-500 to-emerald-600",
    occupied: "bg-gradient-to-r from-rose-500 to-rose-600",
    maintenance: "bg-gradient-to-r from-amber-500 to-amber-600"
  };

  const statusIcons = {
    available: "✅",
    occupied: "🛌",
    maintenance: "🔧"
  };

  const statusCount = {
    available: rooms.filter(r => r.status === "available").length,
    occupied: rooms.filter(r => r.status === "occupied").length,
    maintenance: rooms.filter(r => r.status === "maintenance").length,
    total: rooms.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
                Room Management
              </h1>
              <p className="text-gray-600 font-medium">
                Manage rooms, availability, and configurations
              </p>
            </div>
            <button
              onClick={() => setIsFormVisible(!isFormVisible)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-3 group whitespace-nowrap"
            >
              <span className="relative">
                <svg className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
              </span>
              {isFormVisible ? "Cancel" : "Add New Room"}
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Rooms", value: statusCount.total, color: "from-blue-500 to-cyan-500", icon: "🏨" },
              { label: "Available", value: statusCount.available, color: "from-emerald-500 to-green-500", icon: "✅" },
              { label: "Occupied", value: statusCount.occupied, color: "from-rose-500 to-pink-500", icon: "🛌" },
              { label: "Maintenance", value: statusCount.maintenance, color: "from-amber-500 to-orange-500", icon: "🔧" }
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-5 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center text-2xl`}>
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add Room Form */}
        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-10 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Create New Room</h2>
                </div>

                <form onSubmit={addRoom} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Room Number
                      </label>
                      <input
                        name="roomNumber"
                        placeholder="e.g., 101, 201A"
                        value={form.roomNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 placeholder-gray-400"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Room Type
                      </label>
                      <div className="relative">
                        <select
                          name="type"
                          value={form.type}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 appearance-none cursor-pointer"
                          required
                        >
                          <option value="" className="text-gray-400">Select room type</option>
                          {roomTypes.map((rt) => (
                            <option key={rt._id} value={rt._id} className="text-gray-900">
                              {rt.name} • ₹{rt.price}/night
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Status
                      </label>
                      <div className="relative">
                        <select
                          name="status"
                          value={form.status}
                          onChange={handleChange}
                          className="w-full px-4 py-3.5 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 appearance-none cursor-pointer"
                        >
                          <option value="available" className="text-green-600">✅ Available</option>
                          <option value="occupied" className="text-red-600">🛌 Occupied</option>
                          <option value="maintenance" className="text-yellow-600">🔧 Maintenance</option>
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center gap-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Create Room
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${filter === "all" 
                ? "bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg" 
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
            >
              All Rooms ({statusCount.total})
            </button>
            <button
              onClick={() => setFilter("available")}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${filter === "available" 
                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg" 
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
            >
              Available ({statusCount.available})
            </button>
            <button
              onClick={() => setFilter("occupied")}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${filter === "occupied" 
                ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg" 
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
            >
              Occupied ({statusCount.occupied})
            </button>
            <button
              onClick={() => setFilter("maintenance")}
              className={`px-5 py-2.5 rounded-xl font-medium transition-all duration-300 ${filter === "maintenance" 
                ? "bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg" 
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
            >
              Maintenance ({statusCount.maintenance})
            </button>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Room Inventory
              {filter !== "all" && (
                <span className="text-lg font-normal text-gray-500 ml-2">
                  • {filteredRooms.length} {filter} {filteredRooms.length === 1 ? 'room' : 'rooms'}
                </span>
              )}
            </h2>
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span className="text-sm font-medium">Loading rooms...</span>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-2xl h-72"></div>
                </div>
              ))}
            </div>
          ) : filteredRooms.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-16 text-center"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-3">
                {filter === "all" ? "No rooms yet" : `No ${filter} rooms`}
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {filter === "all" 
                  ? "Get started by adding your first room to the inventory" 
                  : `All rooms are currently ${filter === "available" ? "occupied or under maintenance" : "available"}`}
              </p>
              {filter !== "all" && (
                <button
                  onClick={() => setFilter("all")}
                  className="px-6 py-2.5 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
                >
                  View All Rooms
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredRooms.map((room, index) => (
                  <motion.div
                    key={room._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="group"
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 h-full">
                      {/* Status Bar */}
                      <div className={`h-2 ${statusColors[room.status]}`}></div>
                      
                      <div className="p-6">
                        {/* Room Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                              Room {room.roomNumber}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold text-white ${statusColors[room.status]}`}>
                                {statusIcons[room.status]} {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-gray-900">
                              ₹{room.type?.price || "0"}
                            </div>
                            <div className="text-sm text-gray-500">per night</div>
                          </div>
                        </div>

                        {/* Room Details */}
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Room Type</p>
                            <p className="text-lg font-semibold text-gray-900">{room.type?.name || "N/A"}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Max Guests</p>
                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1.205a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                <span className="font-semibold text-gray-900">{room.type?.maxGuests || "0"}</span>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-gray-500 mb-1">Features</p>
                              <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                                <span className="font-semibold text-gray-900">{room.type?.features?.length || "0"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Delete Button */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                          <button
                            onClick={() => deleteRoom(room._id)}
                            className="w-full py-3 px-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-600 font-semibold rounded-xl hover:from-red-100 hover:to-red-200 hover:border-red-300 hover:text-red-700 active:scale-95 transition-all duration-200 flex items-center justify-center gap-3 group/delete"
                          >
                            <svg className="w-5 h-5 group-hover/delete:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Delete Room
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* Custom CSS for enhanced animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        
        .group:hover .group-hover\\:float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
        
        /* Selection styling */
        ::selection {
          background: rgba(59, 130, 246, 0.2);
          color: #1e40af;
        }
        
        /* Smooth focus rings */
        *:focus {
          outline: none;
          ring-offset-color: transparent;
        }
      `}</style>
    </div>
  );
}

export default Rooms;