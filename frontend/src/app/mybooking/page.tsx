// src/app/mybooking/page.tsx
import BookingList from "@/components/BookingList";

export default function MyBookingPage() {
  return (
    <main className="w-full flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-8">My Booking</h1>
      <BookingList />
    </main>
  );
}