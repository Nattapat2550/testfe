// ไฟล์: src/components/VenueCatalog.tsx
import Link from "next/link";

export default function VenueCatalog({ venuesJson }: { venuesJson: any }) {
  if (!venuesJson || !venuesJson.data) return null;

  return (
    <div className="flex flex-col items-center gap-4 w-full px-4">
      {venuesJson.data.map((venue: any) => (
        <Link 
          href={`/venue/${venue.id || venue._id}`} 
          key={venue.id || venue._id} 
          // ปรับ UI ให้เป็นกล่องข้อความแนวยาว ดูสะอาดตา ไม่มีรูปภาพ
          className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-300 transition-all block"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{venue.name}</h3>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-sm text-gray-600">
                {/* ถ้า API ส่งที่อยู่กับเบอร์โทรมาด้วยในหน้าแรก ก็จะนำมาแสดงตรงนี้ */}
                {venue.address && (
                  <span className="flex items-center gap-1">📍 {venue.address}</span>
                )}
                {venue.tel && (
                  <span className="flex items-center gap-1">📞 {venue.tel}</span>
                )}
              </div>
            </div>
            
            {/* ปุ่มจำลองเพื่อบอกให้รู้ว่ากดเข้าไปดูได้ */}
            <div className="hidden sm:block">
              <span className="text-blue-600 font-semibold bg-blue-50 px-4 py-2 rounded-full text-sm">
                ดูรายละเอียด / จอง
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}