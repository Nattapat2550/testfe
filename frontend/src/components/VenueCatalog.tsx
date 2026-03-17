// ไฟล์: src/components/VenueCatalog.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

export default function VenueCatalog({ venuesJson }: { venuesJson: any }) {
  // สร้าง State สำหรับเก็บคำค้นหา และตัวเลือกการกรอง
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  if (!venuesJson || !venuesJson.data) return null;

  // 1. กรองข้อมูลตามชื่อร้าน หรือ ที่อยู่
  let filteredVenues = venuesJson.data.filter((venue: any) => {
    const searchLower = searchTerm.toLowerCase();
    const matchName = venue.name?.toLowerCase().includes(searchLower);
    const matchAddress = venue.address?.toLowerCase().includes(searchLower);
    return matchName || matchAddress;
  });

  // 2. จัดเรียงข้อมูล (A-Z หรือ Z-A)
  if (sortOrder === "asc") {
    filteredVenues.sort((a: any, b: any) => a.name.localeCompare(b.name));
  } else if (sortOrder === "desc") {
    filteredVenues.sort((a: any, b: any) => b.name.localeCompare(a.name));
  }

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4">
      
      {/* 🟢 แถบ Search & Filter */}
      <div className="w-full max-w-3xl bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex flex-col sm:flex-row gap-4">
        {/* ช่องพิมพ์ค้นหา */}
        <div className="flex-1 relative">
          <span className="absolute left-4 top-3 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="ค้นหาชื่อร้าน หรือ ที่อยู่..." 
            className="w-full pl-10 p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Dropdown สำหรับเรียงลำดับ */}
        <div className="sm:w-48">
          <select 
            className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 cursor-pointer transition-all"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">เรียงตามเริ่มต้น</option>
            <option value="asc">เรียง A - Z</option>
            <option value="desc">เรียง Z - A</option>
          </select>
        </div>
      </div>

      {/* 🟢 แสดงผลรายชื่อร้าน */}
      {filteredVenues.length === 0 ? (
        <div className="mt-10 text-center">
          <p className="text-5xl mb-4">🍽️</p>
          <p className="text-gray-500 text-lg font-medium">ไม่มีร้านอาหารที่ตรงกับการค้นหา "{searchTerm}"</p>
          <button 
            onClick={() => setSearchTerm("")} 
            className="mt-4 text-blue-600 hover:underline"
          >
            ล้างการค้นหา
          </button>
        </div>
      ) : (
        filteredVenues.map((venue: any) => (
          <Link 
            href={`/venue/${venue.id || venue._id}`} 
            key={venue.id || venue._id} 
            className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 block"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{venue.name}</h3>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-600">
                  {venue.address && (
                    <span className="flex items-center gap-1">📍 {venue.address}</span>
                  )}
                  {venue.tel && (
                    <span className="flex items-center gap-1">📞 {venue.tel}</span>
                  )}
                </div>
              </div>
              
              <div className="hidden sm:block">
                <span className="text-blue-600 font-semibold bg-blue-50 px-5 py-2.5 rounded-full text-sm hover:bg-blue-100 transition-colors">
                  ดูรายละเอียด / จอง
                </span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}