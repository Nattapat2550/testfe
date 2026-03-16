"use client";
import { TextField, Select, MenuItem, Button } from '@mui/material';
import DateReserve from './DateReserve';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingForm({ token }: { token?: string }) {
  const router = useRouter();
  const [venue, setVenue] = useState('65184657964561dd942a33a6'); // ต้องเปลี่ยนเป็น ID จริงจาก MongoDB ของคุณ
  const [date, setDate] = useState<string | null>(null);
  
  // สมมติ URL ของ Backend ถ้าเอาขึ้น Vercel แล้วให้เปลี่ยนตรงนี้ หรือใช้ process.env.NEXT_PUBLIC_BACKEND_URL
  const backendUrl = "https://a08-venue-explorer-backend.vercel.app";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Please login first!");
      return;
    }
    if (!date) {
      alert("Please select a date!");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/api/v1/restaurants/${venue}/reservations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          date: date,
          time: "10:00" // สามารถเพิ่ม TimePicker ในอนาคตได้
        })
      });

      if (res.ok) {
        alert("Booking created successfully!");
        router.push("/reservations");
      } else {
        const error = await res.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create booking");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 rounded-lg shadow-md flex flex-col space-y-6">
      <TextField variant="standard" name="Name-Lastname" label="Name-Lastname" fullWidth required />
      <TextField variant="standard" name="Contact-Number" label="Contact-Number" fullWidth required />
      
      <Select 
        variant="standard" 
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        fullWidth
      >
        {/* เปลี่ยน Value ให้ตรงกับ _id ของ Restaurant ใน Database คุณ */}
        <MenuItem value="65184657964561dd942a33a6">The Bloom Pavilion</MenuItem>
        <MenuItem value="65184756964561dd942a33ab">Spark Space</MenuItem>
        <MenuItem value="65184756964561dd942a33ac">The Grand Table</MenuItem>
      </Select>
      
      <div className="pt-2">
        <DateReserve onDateChange={(newDate: string) => setDate(newDate)} />
      </div>
      
      <Button 
        type="submit" 
        variant="contained"
        color="primary"
        className="mt-6 font-semibold py-2 px-4 shadow-sm"
      >
        Book Venue
      </Button>
    </form>
  );
}