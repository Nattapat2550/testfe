"use client";
import { TextField, Select, MenuItem, Button } from '@mui/material';
import DateReserve from './DateReserve';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingForm({ token }: { token?: string }) {
  const router = useRouter();
  const [venue, setVenue] = useState('Bloom');
  const [date, setDate] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      alert("Please login first!");
      return;
    }

    // สมมติว่า Bloom มี ID เป็น restaurantId ใน Backend ของคุณ
    // คุณต้องเปลี่ยน venue ให้ตรงกับ ObjectId ของ Restaurant ใน MongoDB ของคุณ
    const restaurantId = venue === "Bloom" ? "YOUR_RESTAURANT_ID" : "OTHER_ID";

    try {
      const res = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/restaurants/${restaurantId}/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          date: date, // วันที่จาก Component DateReserve
          time: "10:00" // กำหนดเวลาหรือเพิ่ม Field เวลาก็ได้
        })
      });

      if (res.ok) {
        alert("Booking created successfully!");
        router.push("/reservations"); // Redirect ไปหน้าดูการจอง
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
        <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
        <MenuItem value="Spark">Spark Space</MenuItem>
        <MenuItem value="GrandTable">The Grand Table</MenuItem>
      </Select>
      
      <div className="pt-2">
        {/* ต้องปรับ DateReserve ให้สามารถส่งค่า Date กลับมาได้ด้วย (passing props onChange) */}
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