"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function TopMenu() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm border-b z-50 flex items-center justify-between px-6 md:px-12">
      <Link href="/" className="text-2xl font-extrabold text-blue-600 tracking-tight">Reserve<span className="text-gray-800">App</span></Link>
      <div className="flex gap-4 md:gap-8 items-center font-medium">
        <Link href="/venue" className="text-gray-600 hover:text-blue-600 transition">Restaurants</Link>
        {session ? (
          <>
            {session.user.role === "admin" ? (
              <Link href="/admin/manage" className="text-gray-600 hover:text-blue-600">Admin Panel</Link>
            ) : (
              <Link href="/mybooking" className="text-gray-600 hover:text-blue-600">My Bookings</Link>
            )}
            <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition text-sm">
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-600 hover:text-blue-600">Log In</Link>
            <Link href="/register" className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-md">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}