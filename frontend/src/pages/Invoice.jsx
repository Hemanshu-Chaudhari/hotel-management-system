import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function Invoice() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await api.get(`/invoice/${id}`);
    setData(res.data);
  }

  if (!data) return <h2 className="text-center mt-10">Loading...</h2>;

  const { booking, price, nights, amount, tax, total, qr } = data;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Invoice</h1>

      <div className="bg-white shadow p-4 rounded mb-4">
        <p><b>Name:</b> {booking.customerName}</p>
        <p><b>Phone:</b> {booking.customerPhone}</p>
        <p><b>Room:</b> {booking.room.roomNumber}</p>
        <p><b>Room Type:</b> {booking.room.type.name}</p>
      </div>

      <table className="w-full border mb-6">
        <tbody>
          <tr>
            <td className="border p-2 font-semibold">Price / Night</td>
            <td className="border p-2">₹{price}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Nights</td>
            <td className="border p-2">{nights}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Subtotal</td>
            <td className="border p-2">₹{amount}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">GST (12%)</td>
            <td className="border p-2">₹{tax.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border p-2 font-semibold">Total Amount</td>
            <td className="border p-2 font-bold">₹{total.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      {/* UPI QR */}
      {qr && (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Scan UPI QR</h3>
          <img src={qr} alt="UPI QR" className="mx-auto w-48" />
        </div>
      )}
    </div>
  );
}

export default Invoice;
