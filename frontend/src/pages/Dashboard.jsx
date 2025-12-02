import { useEffect, useState } from "react";
import api from "../api";
import { motion } from "framer-motion";

function Dashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    availableRooms: 0,
    booked: 0,
    checkedIn: 0,
    checkedOut: 0,
    revenueToday: 0,
    occupancyRate: 0,
    upcomingCheckouts: 0,
  });

  async function loadStats() {
    try {
      const res = await api.get("/dashboard/stats");
      const data = res.data;
      // Calculate occupancy rate
      const occupancyRate = data.totalRooms > 0 
        ? Math.round(((data.booked + data.checkedIn) / data.totalRooms) * 100)
        : 0;
      
      setStats({
        ...data,
        occupancyRate
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  // Quick links data
  const quickLinks = [
    {
      title: "➕ New Booking",
      description: "Create a new reservation",
      href: "/booking",
      bgColor: "from-saffron-500 to-amber-600",
      hoverColor: "hover:from-saffron-600 hover:to-amber-700",
      icon: "📅",
      emoji: "✨"
    },
    {
      title: "🏨 Manage Rooms",
      description: "View and manage all rooms",
      href: "/rooms",
      bgColor: "from-green-500 to-emerald-600",
      hoverColor: "hover:from-green-600 hover:to-emerald-700",
      icon: "🏰",
      emoji: "🔑"
    },
    {
      title: "🛏 Room Types",
      description: "Configure room categories",
      href: "/room-types",
      bgColor: "from-purple-500 to-indigo-600",
      hoverColor: "hover:from-purple-600 hover:to-indigo-700",
      icon: "🌟",
      emoji: "🛌"
    },
    {
      title: "🔍 Search Bookings",
      description: "Find guest reservations",
      href: "/search",
      bgColor: "from-blue-500 to-cyan-600",
      hoverColor: "hover:from-blue-600 hover:to-cyan-700",
      icon: "👨‍👩‍👧‍👦",
      emoji: "📋"
    }
  ];

  // Stats cards data
  const statCards = [
    {
      title: "Total Rooms",
      value: stats.totalRooms,
      color: "from-blue-500 to-cyan-600",
      icon: "🏰",
      description: "Available inventory"
    },
    {
      title: "Available Rooms",
      value: stats.availableRooms,
      color: "from-green-500 to-emerald-600",
      icon: "✅",
      description: "Ready for guests"
    },
    {
      title: "Booked Rooms",
      value: stats.booked,
      color: "from-amber-500 to-orange-600",
      icon: "📅",
      description: "Reserved"
    },
    {
      title: "Checked-In",
      value: stats.checkedIn,
      color: "from-purple-500 to-indigo-600",
      icon: "🏠",
      description: "Currently staying"
    },
    {
      title: "Checked-Out",
      value: stats.checkedOut,
      color: "from-rose-500 to-pink-600",
      icon: "👋",
      description: "Today departures"
    },
    {
      title: "Occupancy Rate",
      value: `${stats.occupancyRate}%`,
      color: "from-saffron-500 to-yellow-600",
      icon: "📊",
      description: "Current occupancy"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-saffron-50 p-4 md:p-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome to <span className="text-saffron-600">Tirupati Heritage</span> Dashboard
            </h1>
            <p className="text-gray-600 mt-2 flex items-center gap-2">
              <span className="text-2xl">🙏</span>
              <span className="italic">"Atithi Devo Bhava" - Managing hospitality with care</span>
            </p>
          </div>
          
          {/* Date and Time */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-200">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🕰️</div>
              <div>
                <p className="text-sm text-gray-500">Today is</p>
                <p className="text-lg font-semibold text-gray-800">
                  {new Date().toLocaleDateString('en-IN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Revenue Highlight Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <div className="bg-gradient-to-r from-saffron-600 via-amber-600 to-saffron-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="text-6xl">🪷</div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-white text-lg md:text-xl mb-2">Today's Revenue</h2>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    ₹{stats.revenueToday.toLocaleString('en-IN')}
                  </span>
                  <span className="text-amber-200 text-sm">INR</span>
                </div>
                <p className="text-amber-100 mt-2 text-sm">
                  Total revenue generated from all guest transactions today
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-4xl">💰</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-amber-100 relative overflow-hidden group">
              {/* Decorative border */}
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${stat.color}`}></div>
              
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <span className="text-2xl">{stat.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                      <p className="text-gray-600 text-sm">{stat.description}</p>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-700">{stat.title}</h4>
                </div>
                
                {/* Hover effect indicator */}
                <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:rotate-12">
                  →
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Links Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-saffron-500 to-green-500 rounded-full"></div>
          <h2 className="text-2xl font-bold text-gray-800">Quick Actions</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.href}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`block bg-gradient-to-r ${link.bgColor} rounded-2xl p-6 shadow-lg 
                       hover:shadow-2xl transition-all duration-300 ${link.hoverColor}
                       text-white relative overflow-hidden group`}
            >
              {/* Decorative pattern */}
              <div className="absolute top-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-30 transition-opacity">
                <div className="text-4xl">{link.emoji}</div>
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white/20 rounded-xl backdrop-blur-sm flex items-center justify-center">
                    <span className="text-3xl">{link.icon}</span>
                  </div>
                  <h3 className="text-xl font-bold">{link.title}</h3>
                </div>
                <p className="text-white/80 text-sm">{link.description}</p>
                
                {/* Hover arrow */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-medium">Click to access</div>
                  <div className="text-xl transform translate-x-0 group-hover:translate-x-2 transition-transform">
                    →
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-saffron-500 to-amber-600 rounded-lg flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { time: "10:30 AM", activity: "New booking for Suite Room", guest: "Mr. Sharma" },
              { time: "09:45 AM", activity: "Check-in completed", guest: "Patel Family" },
              { time: "08:15 AM", activity: "Room service requested", guest: "Room 201" },
              { time: "07:30 AM", activity: "Check-out processed", guest: "Mr. Gupta" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 hover:bg-amber-50 rounded-lg transition-colors">
                <div className="w-2 h-2 bg-saffron-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-700">{item.activity}</p>
                  <p className="text-sm text-gray-500">{item.guest}</p>
                </div>
                <span className="text-sm text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-6 shadow-xl border border-amber-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-xl">✅</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">System Status</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { system: "Booking System", status: "Operational", color: "bg-green-500" },
              { system: "Payment Gateway", status: "Operational", color: "bg-green-500" },
              { system: "Room Management", status: "Operational", color: "bg-green-500" },
              { system: "Housekeeping", status: "Syncing", color: "bg-amber-500" },
              { system: "Email Notifications", status: "Operational", color: "bg-green-500" },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-amber-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="font-medium text-gray-700">{item.system}</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'Operational' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 text-center"
      >
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg">
          <div className="text-3xl">🏮</div>
          <div className="text-left">
            <p className="text-gray-700 font-medium">
              Welcome to <span className="text-saffron-600 font-bold">Tirupati Heritage</span> Management System
            </p>
            <p className="text-sm text-gray-500">Providing authentic Indian hospitality since 2024</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;