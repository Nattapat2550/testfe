"use client";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import BookingForm from "./BookingForm";

export default function BookingList() {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBookings = useCallback(async () => {
    if (!session?.user?.token) return;
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/reservations`, {
        headers: { Authorization: `Bearer ${session.user.token}` },
      });
      const data = await res.json();
      setBookings(data.data || []);
    } catch (error) {
      console.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => { fetchBookings(); }, [fetchBookings]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this reservation?")) return;
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/reservations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${session?.user?.token}` },
      });
      if (res.ok) setBookings(bookings.filter((b) => b._id !== id));
      else alert("Failed to delete booking.");
    } catch (err) {
      alert("Error deleting booking.");
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading your reservations...</div>;
  if (!session) return <p className="text-center mt-10 text-gray-500">Please log in to view reservations.</p>;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6">
      {bookings.length === 0 ? (
        <div className="bg-white p-10 rounded-2xl border text-center text-gray-500 shadow-sm">No reservations found.</div>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{booking.restaurant?.name || "Deleted Restaurant"}</h2>
                <div className="flex gap-4 mt-2 text-sm text-gray-600 font-medium">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">📅 {new Date(booking.date).toLocaleDateString()}</span>
                  <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full">⏰ {booking.time}</span>
                </div>
                {session.user.role === "admin" && <p className="text-xs text-gray-400 mt-3 bg-gray-50 inline-block px-2 py-1 rounded">User ID: {booking.user}</p>}
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button onClick={() => setEditingId(editingId === booking._id ? null : booking._id)} className="flex-1 md:flex-none bg-yellow-100 text-yellow-700 font-semibold px-5 py-2 rounded-xl hover:bg-yellow-200 transition">
                  {editingId === booking._id ? "Cancel Edit" : "Edit"}
                </button>
                <button onClick={() => handleDelete(booking._id)} className="flex-1 md:flex-none bg-red-100 text-red-600 font-semibold px-5 py-2 rounded-xl hover:bg-red-200 transition">
                  Delete
                </button>
              </div>
            </div>
            {editingId === booking._id && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <BookingForm restaurantId={booking.restaurant?._id} existingBooking={booking} onSuccess={() => { setEditingId(null); fetchBookings(); }} />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}