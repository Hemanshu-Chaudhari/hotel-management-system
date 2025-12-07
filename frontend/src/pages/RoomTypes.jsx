import { useEffect, useState } from "react";
import api from "../api";

function RoomTypes() {
  const [roomTypes, setRoomTypes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    maxGuests: "",
    features: ""
  });

  // LOAD ROOM TYPES
  async function loadTypes() {
    try {
      const res = await api.get("/rooms/type");  // ✔ Correct Route
      setRoomTypes(res.data);
    } catch (err) {
      console.error("Load Room Types Error:", err);
    }
  }

  useEffect(() => {
    loadTypes();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ADD ROOM TYPE
  async function addRoomType(e) {
    e.preventDefault();
    try {
      await api.post(
        "/rooms/type",                                  // ✔ Correct Route
        {
          name: form.name,
          price: form.price,
          maxGuests: form.maxGuests,
          features: form.features.split(","),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // ✔ Required
          },
        }
      );

      setForm({ name: "", price: "", maxGuests: "", features: "" });
      loadTypes();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding type");
    }
  }

  // DELETE ROOM TYPE
  async function deleteType(id) {
    if (!confirm("Delete room type?")) return;

    try {
      await api.delete(`/rooms/type/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      loadTypes();
    } catch (err) {
      alert("Error deleting type");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6 text-gray-700">
        Room Types Management
      </h1>

      {/* ADD FORM */}
      <div className="bg-white p-5 shadow-lg rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-4 text-blue-600">
          ➕ Add Room Type
        </h2>

        <form
          onSubmit={addRoomType}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Room Type Name"
            className="border p-3 rounded"
          />

          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="Price / Night"
            className="border p-3 rounded"
          />

          <input
            name="maxGuests"
            type="number"
            value={form.maxGuests}
            onChange={handleChange}
            placeholder="Max Guests"
            className="border p-3 rounded"
          />

          <input
            name="features"
            value={form.features}
            onChange={handleChange}
            placeholder="Features (comma separated)"
            className="border p-3 rounded"
          />

          <button className="col-span-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700">
            Add Type
          </button>
        </form>
      </div>

      {/* LIST VIEW */}
      <h2 className="text-2xl font-semibold mb-4">All Room Types</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {roomTypes.map((rt) => (
          <div
            key={rt._id}
            className="bg-white p-5 shadow rounded-xl border hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold text-gray-700 mb-2">{rt.name}</h3>

            <p className="mb-1"><b>Price:</b> ₹{rt.price}</p>
            <p className="mb-3"><b>Max Guests:</b> {rt.maxGuests}</p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 mb-3">
              {rt.features.map((f, i) => (
                <span
                  key={i}
                  className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm"
                >
                  {f}
                </span>
              ))}
            </div>

            {/* Delete */}
            <button
              onClick={() => deleteType(rt._id)}
              className="bg-red-600 text-white w-full py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomTypes;
