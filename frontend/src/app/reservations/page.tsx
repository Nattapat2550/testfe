"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button, Card, CardContent, Typography } from '@mui/material';

export default function ManageReservations() {
  const { data: session } = useSession();
  const [reservations, setReservations] = useState([]);
  const token = session?.user?.token;
  const role = session?.user?.role;

  useEffect(() => {
    if (token) fetchReservations();
  }, [token]);

  const fetchReservations = async () => {
    try {
      const res = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/reservations", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setReservations(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this booking?")) return;
    try {
      const res = await fetch(`https://a08-venue-explorer-backend.vercel.app/api/v1/reservations/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        alert("Deleted successfully");
        fetchReservations(); // โหลดข้อมูลใหม่
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!session) return <div className="p-10 text-center text-xl">Please Log-In to view your bookings.</div>;

  return (
    <main className="p-10 w-full flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">
        {role === 'admin' ? "All Bookings (Admin Panel)" : "Your Bookings"}
      </h1>

      <div className="w-full max-w-4xl space-y-4">
        {reservations.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          reservations.map((res: any) => (
            <Card key={res._id} className="w-full shadow-md border border-gray-200">
              <CardContent className="flex justify-between items-center">
                <div>
                  <Typography variant="h6" className="font-bold text-blue-800">
                    Venue: {res.restaurant?.name || "Unknown"}
                  </Typography>
                  <Typography>Date: {new Date(res.date).toLocaleDateString()}</Typography>
                  <Typography>Time: {res.time}</Typography>
                  {role === 'admin' && (
                    <Typography className="text-sm text-gray-500 mt-2">Booked by User ID: {res.user}</Typography>
                  )}
                </div>
                <div className="space-x-2">
                  {/* ปุ่ม Edit: ในโปรเจคจริงอาจลิงก์ไปหน้า Form แก้ไข */}
                  <Button variant="outlined" color="primary" onClick={() => alert('ไปทำหน้า Edit Form รับค่า put เพิ่มเติมนะครับ')}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(res._id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}