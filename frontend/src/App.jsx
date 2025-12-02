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

  // Modern, elegant slider images
  const sliderImages = [
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
  ];

  const features = [
    {
      icon: "🌿",
      title: "Luxury Accommodation",
      description: "Elegant rooms with breathtaking views, premium amenities, and serene ambiance"
    },
    {
      icon: "🍽️",
      title: "Fine Dining Experience",
      description: "Gourmet cuisine with local flavors in our award-winning restaurants"
    },
    {
      icon: "💆",
      title: "Wellness & Spa",
      description: "Rejuvenating treatments and wellness programs in tranquil settings"
    },
    {
      icon: "🎨",
      title: "Cultural Heritage",
      description: "Experience authentic Indian culture through art, music, and traditions"
    },
    {
      icon: "✨",
      title: "Personalized Service",
      description: "Tailored experiences and dedicated staff for every guest"
    },
    {
      icon: "📍",
      title: "Prime Location",
      description: "Strategically located with easy access to major attractions"
    }
  ];

  const LandingPage = () => (
    <div className="overflow-hidden">
      {/* Hero Section */}
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
                  backgroundAttachment: 'fixed'
                }}
              />
            ))}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
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
              {/* Logo */}
              <div className="flex items-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-600 to-amber-800 rounded-2xl flex items-center justify-center shadow-2xl">
                  <span className="text-4xl text-white">🏯</span>
                </div>
                <div className="ml-6">
                  <div className="text-amber-300 font-light tracking-wider mb-1">WELCOME TO</div>
                  <h1 className="text-6xl md:text-7xl font-bold text-white mb-2 leading-tight">
                    Tirupati <span className="text-amber-400">Hotel</span>
                  </h1>
                  <div className="w-32 h-px bg-gradient-to-r from-amber-500 to-transparent mt-2"></div>
                </div>
              </div>
              
              <p className="text-xl text-gray-200 mb-10 leading-relaxed font-light max-w-xl">
                Where timeless Indian hospitality meets contemporary luxury. 
                Experience elegance redefined.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/booking")}
                  className="px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-800 
                           text-white font-semibold rounded-xl hover:shadow-2xl 
                           hover:shadow-amber-500/30 transition-all duration-300 
                           flex items-center gap-3 group"
                >
                  <span className="text-xl">📅</span>
                  Book Your Stay
                  <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 
                           text-white font-semibold rounded-xl hover:bg-white/20 
                           transition-all duration-300 flex items-center gap-3"
                >
                  <span className="text-xl">🔑</span>
                  Guest Portal
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="text-white/70 text-sm tracking-wider mb-2">EXPLORE</div>
          <div className="w-6 h-10 border border-white/30 rounded-full mx-auto">
            <div className="w-1 h-3 bg-white rounded-full mx-auto mt-2 animate-pulse" />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
              <span className="mx-6 text-amber-600 font-light tracking-widest">EXPERIENCE</span>
              <div className="w-16 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Elegance <span className="text-amber-600">Redefined</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
              Discover the perfect blend of modern luxury and authentic Indian hospitality
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
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl 
                         transition-all duration-500 border border-gray-100 
                         relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-amber-700 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} />
        </div>
        
        <div className="relative container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Experience Timeless Luxury
            </h2>
            <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto font-light">
              Your journey to unforgettable moments begins here
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/register")}
                className="px-10 py-4 bg-white text-gray-900 font-semibold rounded-xl 
                         hover:shadow-2xl transition-all duration-300 flex items-center gap-3"
              >
                <span>✨</span>
                Begin Your Journey
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/search")}
                className="px-10 py-4 bg-transparent border-2 border-white/30 text-white 
                         font-semibold rounded-xl hover:bg-white/10 transition-all 
                         duration-300 flex items-center gap-3"
              >
                <span>🔍</span>
                Explore Rooms
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🏯</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Tirupati Hotel</h3>
                  <p className="text-amber-200 text-sm">Luxury Redefined</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                An elegant sanctuary where modern luxury meets authentic Indian hospitality. 
                Experience the perfect harmony of comfort and tradition.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/booking" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Book a Room
                  </Link>
                </li>
                <li>
                  <Link to="/search" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Find Booking
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-400 hover:text-amber-400 transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                    Guest Portal
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Contact</h4>
              <ul className="space-y-4 text-gray-400">
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 mt-1">📞</span>
                  <a href="tel:+919370493479" className="hover:text-amber-400 transition-colors">
                    +91 93704 93479
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 mt-1">✉️</span>
                  <a href="mailto:himanshuchaudhari156@gmail.com" className="hover:text-amber-400 transition-colors">
                    himanshuchaudhari156@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 mt-1">📍</span>
                  <span>Shop 8, Suddhi Vihar, Krushna Chowk, Sagvi, Pimple Gurav, Pune</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-gray-800">Connect</h4>
              <div className="flex gap-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((platform, idx) => (
                  <motion.a
                    key={idx}
                    href={platform === 'instagram' ? 'https://instagram.com/_hemanshu_007' : '#'}
                    target={platform === 'instagram' ? '_blank' : '_self'}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center 
                             justify-center hover:bg-amber-600 transition-all duration-300"
                  >
                    <span className="text-lg">
                      {platform === 'instagram' ? '📷' :
                       platform === 'facebook' ? '📘' :
                       platform === 'twitter' ? '🐦' : '💼'}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Tirupati Hotel Management System. All rights reserved.
            </p>
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
        className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md 
                 shadow-lg border-b border-gray-100"
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <Link to="/" className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-800 
                              rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-xl text-white">🏯</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    Tirupati
                  </span>
                  <p className="text-amber-600 text-sm font-light">Hotel</p>
                </div>
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
                    className="ml-4 px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 
                             text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Logout
                  </motion.button>
                  {role && (
                    <div className="ml-2 px-4 py-2 bg-gradient-to-r from-amber-50 to-amber-100 
                                  rounded-full border border-amber-200">
                      <span className="text-sm font-semibold text-amber-800">
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
                    className="ml-4 px-6 py-2.5 bg-gradient-to-r from-amber-600 to-amber-800 
                             text-white rounded-xl font-medium hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
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
                className="md:hidden overflow-hidden bg-white border-t border-gray-100"
              >
                <div className="py-4 space-y-1">
                  <MobileNavLink to="/" label="Home" onClick={() => setIsMenuOpen(false)} />
                  {isLoggedIn && <MobileNavLink to="/dashboard" label="Dashboard" onClick={() => setIsMenuOpen(false)} />}
                  {role === "admin" && (
                    <>
                      <MobileNavLink to="/room-types" label="Room Types" onClick={() => setIsMenuOpen(false)} />
                      <MobileNavLink to="/rooms" label="Rooms" onClick={() => setIsMenuOpen(false)} />
                    </>
                  )}
                  <MobileNavLink to="/booking" label="Booking" onClick={() => setIsMenuOpen(false)} />
                  <MobileNavLink to="/search" label="Search" onClick={() => setIsMenuOpen(false)} />
                  
                  {isLoggedIn ? (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="w-full px-4 py-3 bg-gradient-to-r from-gray-800 to-gray-900 
                               text-white rounded-xl font-medium hover:shadow-lg transition-all mt-2"
                    >
                      Logout
                    </motion.button>
                  ) : (
                    <>
                      <MobileNavLink to="/login" label="Login" onClick={() => setIsMenuOpen(false)} />
                      <MobileNavLink to="/register" label="Register" onClick={() => setIsMenuOpen(false)} />
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="pt-20">
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
    className="px-5 py-2.5 rounded-lg font-medium text-gray-700 hover:text-amber-600 
             hover:bg-amber-50 transition-all duration-200 mx-1"
  >
    {label}
  </Link>
);

const MobileNavLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-5 py-3 rounded-lg font-medium text-gray-700 
             hover:bg-amber-50 hover:text-amber-600 transition-colors"
  >
    {label}
  </Link>
);

export default App;