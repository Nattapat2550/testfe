"use client";
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { Dayjs } from 'dayjs';

export default function DateReserve({ onDateChange }: { onDateChange?: (date: string) => void }) {
  const [reserveDate, setReserveDate] = useState<Dayjs | null>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={reserveDate}
        onChange={(newValue) => {
          setReserveDate(newValue);
          if (onDateChange && newValue) {
            onDateChange(newValue.format('YYYY-MM-DD'));
          }
        }}
        className="bg-white"
      />
    </LocalizationProvider>
  );
}