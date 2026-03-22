// src/app/booking/page.tsx
"use client";

import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import BookingForm from "@/components/BookingForm"; // ดึง Component ที่ยิง API มาใช้

export default function BookingPage() {
  // สมมติฐานว่า Backend ของคุณคือ Restaurant (ตามไฟล์ routes/restaurants.js)
  // แต่ถ้า Backend ของคุณเป็น Venue ให้เปลี่ยนรายชื่อให้สอดคล้องกัน
  const [selectedVenueId, setSelectedVenueId] = useState<string>("");

  return (
    <main className="w-full flex flex-col items-center space-y-6 mt-10 mb-10 px-4">
      <div className="text-2xl font-bold text-gray-800">Venue Booking</div>

      <div className="w-full max-w-md space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <FormControl fullWidth>
          <InputLabel id="venue-select-label">Select Venue</InputLabel>
          <Select
            labelId="venue-select-label"
            id="venue"
            value={selectedVenueId}
            label="Select Venue"
            onChange={(e) => setSelectedVenueId(e.target.value)}
          >
            {/* ต้องใช้ ObjectId ของ Database จริงๆ เป็น Value เพื่อส่งไป Backend */}
            <MenuItem value="65d123456789abcd00000001">The Bloom Pavilion</MenuItem>
            <MenuItem value="65d123456789abcd00000002">Spark Space</MenuItem>
            <MenuItem value="65d123456789abcd00000003">The Grand Table</MenuItem>
          </Select>
        </FormControl>

        {/* เรียกใช้ BookingForm เมื่อมีการเลือก Venue แล้วเท่านั้น */}
        {selectedVenueId ? (
          <div className="mt-4 border-t pt-4">
            <BookingForm restaurantId={selectedVenueId} />
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4">
            Please select a venue to proceed with booking.
          </div>
        )}
      </div>
    </main>
  );
}