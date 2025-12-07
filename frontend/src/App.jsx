import { Route, Routes, Link, useLocation, useNavigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import { setAuthToken } from "./api";
import { useEffect, useState } from "react";
import RoomTypes from "./pages/RoomTypes";
import Rooms from "./pages/Rooms";
import Booking from "./pages/Booking";
import Search from "./pages/Search";
import Invoice from "./pages/Invoice";
import Payment from "./pages/Payment";
import { motion, AnimatePresence } from "framer-motion";

// Updated with your information
const HOTEL_INFO = {
  name: "Hotel",
  instagram: "_hemanshu_007",
  phone: "+91 9370493479",
  email: "himanshuchaudhari156@gmail.com",
  address: "123 Hotel Street, City, State, PIN Code"
};

function App() {
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setAuthToken(token);

    const r = localStorage.getItem("role");
    if (r) setRole(r);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    setRole(null);
    navigate("/");
    setIsMenuOpen(false);
  };

  // Image array for slider
  const sliderImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  const features = [
    {
      icon: "🛌",
      title: "Luxury Accommodation",
      description: "Premium rooms with panoramic views, premium bedding, and state-of-the-art amenities"
    },
    {
      icon: "🍽️",
      title: "Fine Dining",
      description: "Award-winning restaurants with world-class cuisine and 24/7 room service"
    },
    {
      icon: "🏊",
      title: "Wellness & Spa",
      description: "Full-service spa, fitness center, and indoor/outdoor pools"
    },
    {
      icon: "📱",
      title: "Digital Concierge",
      description: "Mobile app for room controls, services, and personalized recommendations"
    },
    {
      icon: "🛡️",
      title: "Secure Booking",
      description: "Military-grade encryption for all transactions and personal data"
    },
    {
      icon: "⭐",
      title: "VIP Services",
      description: "Personal butler, private check-in/out, and exclusive access to premium facilities"
    }
  ];

  const testimonials = [
    {
      name: "Alexander Chen",
      role: "Business Traveler",
      text: "The digital check-in and room customization through the app was exceptional. True luxury meets technology.",
      rating: "★★★★★"
    },
    {
      name: "Sophia Rodriguez",
      role: "Honeymooner",
      text: "Our suite was breathtaking. The staff anticipated our every need. An unforgettable experience.",
      rating: "★★★★★"
    },
    {
      name: "James Wilson",
      role: "Conference Attendee",
      text: "Perfect blend of business amenities and relaxation. The meeting facilities are world-class.",
      rating: "★★★★☆"
    }
  ];

  const LandingPage = () => (
    <div className="overflow-hidden">
      {/* Hero Section with Slider */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            {sliderImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  animationDelay: `${index * 5}s`
                }}
              />
            ))}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex items-center">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Experience <span className="text-amber-400">Luxury</span> Redefined
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Welcome to {HOTEL_INFO.name} - Where modern elegance meets unparalleled hospitality. 
                Your journey to extraordinary stays begins here.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/booking")}
                  className="px-8 py-3 bg-amber-500 text-white font-semibold rounded-lg 
                           hover:bg-amber-600 transition-all duration-300 shadow-lg 
                           hover:shadow-amber-500/30"
                >
                  Book Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="px-8 py-3 bg-transparent border-2 border-white text-white 
                           font-semibold rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  Member Login
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {sliderImages.map((_, index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-white rounded-full cursor-pointer"
              whileHover={{ scale: 1.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, delay: index * 0.2 }}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-white text-sm">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white rounded-full mx-auto mt-2">
            <div className="w-1 h-3 bg-white rounded-full mx-auto mt-2" />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-blue-600">{HOTEL_INFO.name}</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              We combine cutting-edge technology with timeless hospitality to create unforgettable experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl 
                         transition-all duration-300 border border-gray-100"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.2
        }} />
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready for an Exceptional Stay?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied guests who've experienced the {HOTEL_INFO.name} difference
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/register")}
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg 
                         hover:bg-gray-100 transition-all duration-300 shadow-lg"
              >
                Create Account
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/search")}
                className="px-8 py-3 bg-transparent border-2 border-white text-white 
                         font-bold rounded-lg hover:bg-white/10 transition-all duration-300"
              >
                Check Availability
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">🏨 {HOTEL_INFO.name}</h3>
              <p className="text-gray-400">
                Redefining luxury hospitality through innovation and exceptional service.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/booking" className="text-gray-400 hover:text-white">Book a Room</Link></li>
                <li><Link to="/search" className="text-gray-400 hover:text-white">Find Booking</Link></li>
                <li><Link to="/login" className="text-gray-400 hover:text-white">Member Login</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📞 {HOTEL_INFO.phone}</li>
                <li>✉️ {HOTEL_INFO.email}</li>
                <li>📍 {HOTEL_INFO.address}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                {/* Instagram Link */}
                <motion.a
                  href={`https://instagram.com/${HOTEL_INFO.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center 
                           justify-center cursor-pointer hover:bg-pink-600"
                >
                  📷
                </motion.a>
                
                {/* Email Link */}
                <motion.a
                  href={`mailto:${HOTEL_INFO.email}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center 
                           justify-center cursor-pointer hover:bg-red-600"
                >
                  ✉️
                </motion.a>
                
                {/* Phone Link */}
                <motion.a
                  href={`tel:${HOTEL_INFO.phone.replace(/\s/g, '')}`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center 
                           justify-center cursor-pointer hover:bg-green-600"
                >
                  📞
                </motion.a>
                
                {/* Other social icons */}
                {['📘', '🐦'].map((icon, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center 
                             justify-center cursor-pointer hover:bg-blue-600"
                  >
                    {icon}
                  </motion.div>
                ))}
              </div>
              <p className="mt-4 text-gray-400 text-sm">
                Follow us on Instagram: @{HOTEL_INFO.instagram}
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} {HOTEL_INFO.name}. All rights reserved.</p>
            <p className="mt-2 text-sm">Contact: {HOTEL_INFO.phone} | Email: {HOTEL_INFO.email}</p>
          </div>
        </div>
      </footer>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md 
                 shadow-lg border-b border-gray-200"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Link to="/" className="flex items-center gap-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-amber-500 
                              rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">H</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 
                               to-amber-500 bg-clip-text text-transparent">
                  {HOTEL_INFO.name}
                </span>
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              <NavLink to="/" label="Home" />
              {isLoggedIn && <NavLink to="/dashboard" label="Dashboard" />}
              
              {role === "admin" && (
                <>
                  <NavLink to="/room-types" label="Room Types" />
                  <NavLink to="/rooms" label="Rooms" />
                </>
              )}
              
              <NavLink to="/booking" label="Booking" />
              <NavLink to="/search" label="Search" />
              
              {isLoggedIn ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="ml-4 px-6 py-2 bg-red-500 text-white rounded-lg 
                             font-semibold hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </motion.button>
                  {role && (
                    <div className="ml-2 px-3 py-1 bg-gradient-to-r from-blue-100 
                                  to-blue-50 rounded-full border border-blue-200">
                      <span className="text-sm font-semibold text-blue-700">
                        {role.toUpperCase()}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <NavLink to="/login" label="Login" />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/register")}
                    className="ml-4 px-6 py-2 bg-gradient-to-r from-blue-600 
                             to-amber-500 text-white rounded-lg font-semibold 
                             hover:opacity-90 transition-all shadow-lg"
                  >
                    Sign Up
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1">
                <div className={`h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <div className={`h-0.5 bg-gray-700 transition-all ${isMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`h-0.5 bg-gray-700 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="py-4 space-y-2">
                  <MobileNavLink to="/" label="🏠 Home" onClick={() => setIsMenuOpen(false)} />
                  {isLoggedIn && <MobileNavLink to="/dashboard" label="📊 Dashboard" onClick={() => setIsMenuOpen(false)} />}
                  {role === "admin" && (
                    <>
                      <MobileNavLink to="/room-types" label="🏠 Room Types" onClick={() => setIsMenuOpen(false)} />
                      <MobileNavLink to="/rooms" label="🚪 Rooms" onClick={() => setIsMenuOpen(false)} />
                    </>
                  )}
                  <MobileNavLink to="/booking" label="📅 Booking" onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/search" label="🔍 Search" onClick={() => setIsMenuOpen(false)} />
                  
                  {isLoggedIn ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="w-full px-4 py-3 bg-red-500 text-white rounded-lg 
                               font-semibold hover:bg-red-600 transition-colors"
                    >
                      👋 Logout
                    </motion.button>
                  ) : (
                    <>
                      <MobileNavLink to="/login" label="🔑 Login" onClick={() => setIsMenuOpen(false)} />
                      <MobileNavLink to="/register" label="📝 Register" onClick={() => setIsMenuOpen(false)} />
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/room-types" element={<AdminRoute><RoomTypes /></AdminRoute>} />
              <Route path="/rooms" element={<AdminRoute><Rooms /></AdminRoute>} />
              <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
              <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
              <Route path="/invoice/:id" element={<ProtectedRoute><Invoice /></ProtectedRoute>} />
              <Route path="/payment/:id" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// Helper Components
const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-blue-600 
             hover:bg-blue-50 transition-all duration-200"
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-4 py-3 rounded-lg font-medium text-gray-700 
             hover:bg-blue-50 hover:text-blue-600 transition-colors"
  >
    {label}
  </Link>
);

export default App;