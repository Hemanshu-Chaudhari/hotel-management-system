import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Login() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      setTimeout(() => {
        nav("/dashboard");
      }, 500);
      
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-saffron-50 to-orange-50 flex items-center justify-center p-4">
      
      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl p-8 border border-amber-200 shadow-xl">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-saffron-500 to-green-500 rounded-xl mb-4">
              <span className="text-3xl text-white">🙏</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Tirupati <span className="text-saffron-600">Heritage</span>
            </h1>
            <p className="text-gray-600 mt-2">Sign in to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pl-12 border-2 border-amber-200 rounded-lg 
                           focus:border-saffron-500 focus:ring-2 focus:ring-saffron-200 
                           focus:outline-none transition-all"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <span>📧</span>
                </div>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pl-12 pr-12 border-2 border-amber-200 rounded-lg 
                           focus:border-saffron-500 focus:ring-2 focus:ring-saffron-200 
                           focus:outline-none transition-all"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <span>🔒</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 
                           hover:text-saffron-600"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white
                       ${isLoading 
                         ? 'bg-gray-400 cursor-not-allowed' 
                         : 'bg-gradient-to-r from-saffron-500 to-amber-600 hover:from-saffron-600 hover:to-amber-700'
                       } shadow-md transition-all`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => nav("/register")}
                className="text-saffron-600 hover:text-saffron-700 font-medium"
              >
                Register
              </button>
            </p>
          </div>

          {/* Simple Footer */}
          <div className="mt-8 pt-6 border-t border-amber-100">
            <p className="text-xs text-center text-gray-500">
              Tirupati hotel © 2025
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;