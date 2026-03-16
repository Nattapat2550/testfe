"use client";
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

// 1. เพิ่ม Type มารับ Props onDateChange
export default function DateReserve({ onDateChange }: { onDateChange?: (date: string) => void }) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={reserveDate}
        onChange={(newValue) => {
          setReserveDate(newValue);
          // 2. เมื่อมีการเปลี่ยนวันที่ ให้ส่งค่ากลับไปที่ฟอร์มหลัก
          if (onDateChange && newValue) {
            onDateChange(newValue.format('YYYY-MM-DD'));
          }
        }}
      />
    </LocalizationProvider>
  );
}