import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "staff"
  });

  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await api.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      alert("Registration successful!");
      setTimeout(() => nav("/dashboard"), 500);
      
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-saffron-50 to-orange-50 flex items-center justify-center p-4">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        {/* Decorative Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block relative"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-saffron-500 to-green-500 rounded-2xl shadow-lg flex items-center justify-center mb-4">
              <span className="text-4xl text-white">✨</span>
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-red-500 rounded-full"></div>
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mt-4">
            Join <span className="text-saffron-600">Tirupati</span>
          </h1>
          <p className="text-gray-600 mt-2">Create your staff account</p>
        </div>

        {/* Register Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
          {/* Colorful Header Bar */}
          <div className="h-2 bg-gradient-to-r from-saffron-400 via-green-500 to-saffron-400"></div>
          
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 pl-12 bg-amber-50/50 border-2 border-amber-200 
                             rounded-xl focus:border-saffron-500 focus:ring-2 focus:ring-saffron-100 
                             focus:outline-none transition-all duration-300 
                             placeholder-gray-400 group-hover:border-amber-300"
                    placeholder="Enter your name"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-saffron-500 transition-colors">
                    <span className="text-xl">👤</span>
                  </div>
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 pl-12 bg-amber-50/50 border-2 border-amber-200 
                             rounded-xl focus:border-saffron-500 focus:ring-2 focus:ring-saffron-100 
                             focus:outline-none transition-all duration-300 
                             placeholder-gray-400 group-hover:border-amber-300"
                    placeholder="you@email.com"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-saffron-500 transition-colors">
                    <span className="text-xl">📧</span>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3.5 pl-12 pr-12 bg-amber-50/50 border-2 border-amber-200 
                             rounded-xl focus:border-saffron-500 focus:ring-2 focus:ring-saffron-100 
                             focus:outline-none transition-all duration-300 
                             placeholder-gray-400 group-hover:border-amber-300"
                    placeholder="Create a strong password"
                  />
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-saffron-500 transition-colors">
                    <span className="text-xl">🔒</span>
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-saffron-500 transition-colors">
                    <span className="text-sm">🔑</span>
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Role
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 pl-12 bg-amber-50/50 border-2 border-amber-200 
                             rounded-xl focus:border-saffron-500 focus:ring-2 focus:ring-saffron-100 
                             focus:outline-none transition-all duration-300 
                             appearance-none group-hover:border-amber-300"
                  >
                    <option value="staff">Staff Member</option>
                    <option value="admin">Administrator</option>
                  </select>
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-saffron-500 transition-colors">
                    <span className="text-xl">👑</span>
                  </div>
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <span className="text-sm">▼</span>
                  </div>
                </div>
              </div>

              {/* Register Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg mt-2
                         ${isLoading 
                           ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                           : 'bg-gradient-to-r from-saffron-500 to-amber-600 text-white hover:shadow-xl hover:from-saffron-600 hover:to-amber-700'
                         } transition-all duration-300 relative overflow-hidden`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Account...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xl"></span>
                    Create Account
                  </div>
                )}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="my-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-amber-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>
            </div>

            {/* Login Link */}
            <motion.button
              onClick={() => nav("/login")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 border-2 border-saffron-500 text-saffron-600 
                       font-semibold rounded-xl hover:bg-saffron-50 transition-all 
                       duration-300 flex items-center justify-center gap-2"
            >
              <span>🔑</span>
              Sign In to Existing Account
            </motion.button>
          </div>
        </div>

        {/* Simple Brand Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2025 Tirupati Hotel • Indian Hospitality Excellence
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default Register;