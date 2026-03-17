import BookingList from "@/components/BookingList";

export default function MyBookingPage() {
  return (
    <main className="p-6 md:p-12 min-h-screen">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-500">Manage all your upcoming reservations here</p>
      </div>
      <BookingList />
    </main>
  );
}