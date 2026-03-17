import getVenue from "@/libs/getVenue";
import BookingForm from "@/components/BookingForm";
import Link from "next/link";

// กำหนด Type ของ params ให้ชัดเจนตามโครงสร้าง Next.js 15
type Props = {
  params: Promise<{ vid: string }>;
};

export default async function VenueDetailPage({ params }: Props) {
  // 1. Unpack params แบบ Promise อย่างถูกต้อง
  const { vid } = await params;

  let venueDetail;
  let venue;

  try {
    // 2. ดึงข้อมูลจาก API
    venueDetail = await getVenue(vid);
    venue = venueDetail?.data;

  } catch (error) {
    // 🔥 ปริ้นท์ Error ลงในระบบหลังบ้าน (Vercel Logs) เพื่อให้รู้สาเหตุที่แท้จริง
    console.error(`[GET VENUE ERROR] เกิดข้อผิดพลาดตอนดึงข้อมูล ID: ${vid}`, error);

    return (
      <main className="p-10 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-red-500 mb-2">Error Loading Restaurant</h1>
        <p className="text-gray-500 mb-2">ไม่สามารถเชื่อมต่อกับฐานข้อมูลเพื่อดึงรายละเอียดร้านนี้ได้</p>
        <p className="text-sm text-gray-400 bg-gray-50 p-3 rounded-lg mb-6 border border-gray-200">
          กำลังพยายามดึงข้อมูลร้าน ID: <span className="font-mono text-red-400">{vid}</span>
        </p>
        <Link href="/venue" className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition shadow-md">
          กลับไปหน้ารวมร้านอาหาร
        </Link>
      </main>
    );
  }

  // ป้องกันกรณีไม่พบร้าน (ข้อมูลเป็น null/undefined)
  if (!venue) {
    return (
      <main className="p-10 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Restaurant Not Found</h1>
        <p className="text-gray-500 mb-6">ไม่พบข้อมูลร้านอาหารที่คุณต้องการ</p>
        <Link href="/venue" className="bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition shadow-md">
          กลับไปหน้ารวมร้านอาหาร
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 md:p-12 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 mt-4">
      <div className="flex-1">
        <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase mb-4 inline-block shadow-sm">
          Restaurant Detail
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{venue.name}</h1>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-gray-700 space-y-5 text-lg">
          <div className="flex items-start gap-4"><span className="text-2xl">📍</span><p><strong>Address:</strong><br/>{venue.address}</p></div>
          <div className="flex items-start gap-4"><span className="text-2xl">📞</span><p><strong>Telephone:</strong><br/>{venue.tel}</p></div>
          <div className="flex items-start gap-4"><span className="text-2xl">🕒</span><p><strong>Operating Hours:</strong><br/>{venue.opentime} - {venue.closetime}</p></div>
        </div>
      </div>
      <div className="flex-1 lg:max-w-md w-full">
        {/* ส่ง restaurantId เข้าไปเพื่อให้กดจองได้ */}
        <BookingForm restaurantId={venue._id} />
      </div>
    </main>
  );
}