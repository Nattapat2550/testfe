"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  restaurantId?: string;
  existingBooking?: any;
  onSuccess?: () => void;
}

export default function BookingForm({ restaurantId, existingBooking, onSuccess }: BookingFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  
  const initialDate = existingBooking?.date ? new Date(existingBooking.date).toISOString().split('T')[0] : "";
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(existingBooking?.time || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
      setIsLoading(false);
      return setError("Invalid time format. Use HH:MM");
    }
    if (new Date(date) < new Date(new Date().setHours(0,0,0,0))) {
      setIsLoading(false);
      return setError("Cannot book a date in the past.");
    }

    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    const url = existingBooking 
      ? `${BACKEND_URL}/api/v1/reservations/${existingBooking._id}` 
      : `${BACKEND_URL}/api/v1/restaurants/${restaurantId}/reservations`;
    
    try {
      const res = await fetch(url, {
        method: existingBooking ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify({ date, time }),
      });

      if (res.ok) {
        if (onSuccess) onSuccess();
        else {
            router.push("/mybooking");
            router.refresh();
        }
      } else {
        const data = await res.json();
        setError(data.message || "Failed to process booking.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!session) return <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg">Please log in to make a reservation.</div>;

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col gap-4">
      <h3 className="text-xl font-bold text-gray-800">{existingBooking ? "Edit Reservation" : "Book a Table"}</h3>
      {error && <p className="text-red-500 bg-red-50 p-3 rounded-lg text-sm border border-red-100">{error}</p>}
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Date</label>
        <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time (e.g., 18:30)</label>
        <input type="time" required value={time} onChange={(e) => setTime(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none" />
      </div>
      
      <button type="submit" disabled={isLoading} className={`w-full text-white py-3 rounded-xl font-semibold transition shadow-md mt-2 ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
        {isLoading ? "Processing..." : (existingBooking ? "Update Booking" : "Confirm Booking")}
      </button>
    </form>
  );
}