import getVenue from "@/libs/getVenue";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";

// รองรับทั้งแบบ Params ธรรมดาและ Promise (สำหรับ Next.js เวอร์ชั่นใหม่)
export default async function VenueDetailPage({ params }: { params: any }) {
  let venueDetail;
  let venue;

  try {
    // 1. ดึงค่า ID ของร้านอาหารจาก URL
    const resolvedParams = await params;
    const vid = resolvedParams.vid;

    // 2. พยายามดึงข้อมูลจาก Backend
    venueDetail = await getVenue(vid);
    venue = venueDetail?.data;

  } catch (error) {
    // 3. ถ้าดึงข้อมูลไม่ได้ (Backend พัง หรือ API ขัดข้อง) ให้แสดงหน้านี้แทนหน้าเว็บพัง
    return (
      <main className="p-10 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Error Loading Restaurant</h1>
        <p className="text-gray-500 mb-6">ไม่สามารถเชื่อมต่อกับฐานข้อมูลเพื่อดึงรายละเอียดร้านนี้ได้</p>
        <Link href="/venue" className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
          กลับไปหน้ารวมร้านอาหาร
        </Link>
      </main>
    );
  }

  // 4. ถ้าดึงข้อมูลสำเร็จ แต่ไม่มีร้านนี้ในฐานข้อมูล (อาจถูกลบไปแล้ว)
  if (!venue) {
    return (
      <main className="p-10 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Restaurant Not Found</h1>
        <p className="text-gray-500 mb-6">ไม่พบข้อมูลร้านอาหารที่คุณต้องการ</p>
        <Link href="/venue" className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
          กลับไปหน้ารวมร้านอาหาร
        </Link>
      </main>
    );
  }

  // 5. ถ้าข้อมูลถูกต้องสมบูรณ์ ให้แสดงหน้ารายละเอียดและฟอร์มจอง
  return (
    <main className="p-6 md:p-12 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 mt-4">
      <div className="flex-1">
        <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase mb-4 inline-block">
          Restaurant Detail
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{venue.name}</h1>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-gray-700 space-y-5 text-lg">
          <div className="flex items-start gap-4">
            <span className="text-2xl">📍</span>
            <p><strong>Address:</strong><br/>{venue.address}</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">📞</span>
            <p><strong>Telephone:</strong><br/>{venue.tel}</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-2xl">🕒</span>
            <p><strong>Operating Hours:</strong><br/>{venue.opentime} - {venue.closetime}</p>
          </div>
        </div>
      </div>
      
      {/* ส่ง _id ของร้านไปให้ BookingForm เพื่อทำการจอง */}
      <div className="flex-1 lg:max-w-md w-full">
        <BookingForm restaurantId={venue._id} />
      </div>
    </main>
  );
}