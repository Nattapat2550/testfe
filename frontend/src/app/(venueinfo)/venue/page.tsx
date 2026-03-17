import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";

export default async function VenuesPage() {
  // 1. ดึงข้อมูลร้านอาหารทั้งหมดจาก Backend
  const venues = await getVenues();

  return (
    <main className="p-6 md:p-12 max-w-6xl mx-auto">
      <div className="text-center mb-10 mt-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Select Your Restaurant</h1>
        <p className="text-gray-500">เลือกร้านอาหารที่คุณต้องการจอง</p>
      </div>
      
      {/* 2. ส่งข้อมูลไปแสดงผลเป็น Grid ใน VenueCatalog */}
      <VenueCatalog venuesJson={venues} />
    </main>
  );
}