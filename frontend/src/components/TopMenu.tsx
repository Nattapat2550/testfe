"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function TopMenu() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md shadow-sm border-b z-50 flex items-center justify-between px-6 md:px-12">
      {/* เปลี่ยนจาก ReserveApp เป็นโลโก้ที่ดูเข้ากับร้านอาหาร */}
      <Link href="/" className="text-2xl font-extrabold text-primary-600 tracking-tight">
        Reserve<span className="text-gray-800">Table</span>
      </Link>
      
      <div className="flex gap-4 md:gap-8 items-center font-medium">
        <Link href="/venue" className="text-gray-600 hover:text-primary-600 transition">Restaurants</Link>
        
        {session ? (
          <>
            {session.user.role === "admin" ? (
              <Link href="/admin/manage" className="text-gray-600 hover:text-primary-600">Admin Panel</Link>
            ) : (
              <Link href="/mybooking" className="text-gray-600 hover:text-primary-600">My Bookings</Link>
            )}
            <button 
              onClick={() => signOut({ callbackUrl: '/' })} 
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-red-50 hover:text-primary-600 transition text-sm font-semibold"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-600 hover:text-primary-600 transition">Log In</Link>
            <Link href="/register" className="bg-primary-600 text-blue-600 px-5 py-2 rounded-full hover:bg-primary-700 transition shadow-md shadow-primary-500/30">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}