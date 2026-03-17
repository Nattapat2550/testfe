import getVenues from "@/libs/getVenues";
import Link from "next/link";

export default async function VenuePage() {
  let venues;
  
  // ใช้ Try-Catch ป้องกันกรณี Backend พังหรือดึงข้อมูลไม่ได้
  try {
    venues = await getVenues();
  } catch (error) {
    return (
      <main className="p-10 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Error Loading Restaurants</h1>
        <p className="text-gray-500">ไม่สามารถเชื่อมต่อกับฐานข้อมูลได้ กรุณาลองใหม่อีกครั้ง</p>
      </main>
    );
  }

  // ป้องกันกรณี Backend ส่งข้อมูลมาผิดรูปแบบ (ไม่มี properties: data)
  if (!venues || !venues.data || !Array.isArray(venues.data)) {
    return (
      <main className="p-10 text-center min-h-[60vh] flex flex-col justify-center items-center">
         <h1 className="text-2xl font-bold text-gray-700">No Restaurants Available</h1>
         <p className="text-gray-500">ยังไม่มีร้านอาหารในระบบขณะนี้</p>
      </main>
    );
  }

  return (
    <main className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Select a Restaurant</h1>
        <p className="text-gray-500">Explore our curated list of top dining spots</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* เริ่มต้นการ Map ข้อมูล */}
        {venues.data.map((venue: any) => (
          <Link 
            href={`/venue/${venue._id}`} 
            key={venue._id} 
            className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 flex flex-col group"
          >
            <div className="grow">
                <h2 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition">{venue.name}</h2>
                <p className="text-gray-500 mt-3 text-sm leading-relaxed line-clamp-2">📍 {venue.address}</p>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col gap-2 text-sm font-medium text-gray-600">
              <span className="bg-gray-50 p-2 rounded-lg">📞 {venue.tel}</span>
              <span className="bg-gray-50 p-2 rounded-lg">🕒 {venue.opentime} - {venue.closetime}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}