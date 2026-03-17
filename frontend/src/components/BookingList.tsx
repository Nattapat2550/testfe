// src/components/BookingList.tsx
"use client";

import { useAppSelector, AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { removeBooking } from "@/redux/features/bookSlice";

export default function BookingList() {
  const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  if (bookItems.length === 0) {
    return <div className="text-center text-xl mt-10 text-gray-500">No Venue Booking</div>;
  }

  return (
    <div className="w-full flex flex-col items-center space-y-4">
      {bookItems.map((item, index) => (
        <div key={index} className="bg-slate-200 rounded-lg px-8 py-5 w-full max-w-xl shadow-md">
          <div className="text-lg font-bold">Name: {item.nameLastname}</div>
          <div className="text-md">Contact Number: {item.tel}</div>
          <div className="text-md">Venue: {item.venue}</div>
          <div className="text-md">Date: {item.bookDate}</div>
          
          <button
            className="mt-4 block rounded-md bg-red-600 hover:bg-red-700 px-4 py-2 text-white shadow-sm"
            onClick={() => dispatch(removeBooking(item))}
          >
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
}