import BookingList from "@/components/BookingList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function AdminManagePage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== "admin") {
    redirect("/login");
  }

  return (
    <main className="p-6 md:p-12 min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-6 rounded-2xl shadow-sm border border-red-100 gap-4">
        <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage all user reservations</p>
        </div>
        <span className="bg-red-50 text-red-600 px-5 py-2 rounded-full text-sm font-bold border border-red-200 tracking-wider">ADMINISTRATOR MODE</span>
      </div>
      <BookingList />
    </main>
  );
}