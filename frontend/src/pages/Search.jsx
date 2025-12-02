import { useState } from "react";
import api from "../api";
import { 
  Search as SearchIcon, 
  User, 
  Phone, 
  Calendar,
  Hash,
  Building,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(e) {
    e?.preventDefault();
    
    if (!query.trim()) {
      alert("Please enter a name or phone number");
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.get(`/search?q=${encodeURIComponent(query.trim())}`);
      setResults(res.data);
    } catch (err) {
      alert("Search failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "checked-in":
        return <CheckCircle className="w-4 h-4" />;
      case "checked-out":
        return <CheckCircle className="w-4 h-4" />;
      case "booked":
        return <Clock className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "checked-in":
        return "bg-green-50 text-green-700 border-green-200";
      case "checked-out":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "booked":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Guest Search
          </h1>
          <p className="text-gray-600 mt-2">
            Search for bookings by guest name, phone number, or reservation ID
          </p>
        </div>

        {/* Search Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <SearchIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">Search Criteria</h2>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={query}
                placeholder="Enter guest name, phone number, or booking reference..."
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                         text-gray-700 placeholder-gray-500
                         transition-all duration-200"
                disabled={isLoading}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <XCircle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Press Enter or click Search to find bookings
              </p>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 
                         text-white font-semibold rounded-xl hover:from-blue-700 
                         hover:to-blue-800 focus:outline-none focus:ring-2 
                         focus:ring-blue-500 focus:ring-offset-2 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <SearchIcon className="w-4 h-4" />
                    Search Bookings
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                Search Results
                <span className="bg-blue-100 text-blue-700 text-sm font-medium 
                              px-2.5 py-0.5 rounded-full">
                  {results.length} {results.length === 1 ? 'booking' : 'bookings'} found
                </span>
              </h3>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <SearchIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                No bookings found
              </h4>
              <p className="text-gray-500 max-w-md mx-auto">
                {query ? 
                  `No results found for "${query}". Try searching with a different name or phone number.` :
                  'Enter search criteria above to find bookings.'
                }
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {results.map((b) => (
                <div
                  key={b._id}
                  className="p-6 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* Guest Info Column */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-50 rounded-xl">
                          <User className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 mb-1">
                            {b.customerName}
                          </h4>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{b.customerPhone}</span>
                          </div>
                          <div className="mt-3">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 
                                          rounded-full border text-sm font-medium 
                                          ${getStatusColor(b.status)}`}>
                              {getStatusIcon(b.status)}
                              {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Room Info Column */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-50 rounded-xl">
                          <Building className="w-6 h-6 text-amber-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 mb-2">Room Details</h5>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Hash className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">
                                Room {b.room?.roomNumber}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Building className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">
                                {b.room?.type?.name}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dates Column */}
                    <div className="lg:col-span-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-purple-50 rounded-xl">
                          <Calendar className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h5 className="font-medium text-gray-900 mb-2">Stay Period</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Check-in</span>
                              <span className="font-medium text-gray-900">
                                {new Date(b.checkIn).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-500">Check-out</span>
                              <span className="font-medium text-gray-900">
                                {new Date(b.checkOut).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Additional Info */}
                  {b.specialRequests && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Special Requests:</span> {b.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Showing bookings from the last 12 months. For older reservations, 
            please contact the front desk.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Search;