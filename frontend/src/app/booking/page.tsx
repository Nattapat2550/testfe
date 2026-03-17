// src/app/booking/page.tsx
"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";
import { BookingItem } from "../../../interface";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

export default function BookingPage() {
  const dispatch = useDispatch<AppDispatch>();

  const [nameLastname, setNameLastname] = useState("");
  const [tel, setTel] = useState("");
  const [venue, setVenue] = useState("Bloom");
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);

  const handleBookVenue = () => {
    if (nameLastname && tel && venue && bookDate) {
      const item: BookingItem = {
        nameLastname: nameLastname,
        tel: tel,
        venue: venue,
        bookDate: dayjs(bookDate).format("YYYY/MM/DD"),
      };
      dispatch(addBooking(item));
    }
  };

  return (
    <main className="w-full flex flex-col items-center space-y-6 mt-10">
      <div className="text-2xl font-bold">Venue Booking</div>

      <div className="w-full max-w-sm space-y-4 flex flex-col">
        <TextField
          name="Name-Lastname"
          label="Name-Lastname"
          variant="outlined"
          value={nameLastname}
          onChange={(e) => setNameLastname(e.target.value)}
        />

        <TextField
          name="Contact-Number"
          label="Contact-Number"
          variant="outlined"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel>Venue</InputLabel>
          <Select
            id="venue"
            name="venue"
            value={venue}
            label="Venue"
            onChange={(e) => setVenue(e.target.value)}
          >
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Book Date"
            value={bookDate}
            onChange={(newValue) => setBookDate(newValue)}
          />
        </LocalizationProvider>

        <Button
          name="Book Venue"
          variant="contained"
          onClick={handleBookVenue}
          sx={{ mt: 2 }}
        >
          Book Venue
        </Button>
      </div>
    </main>
  );
}