import getVenue from "@/libs/getVenue";
import Image from "next/image"; // เพิ่ม import

export default async function VenueDetailPage({ params }: { params: Promise<{ vid: string }> }) {
  const { vid } = await params;
  const venueDetail = await getVenue(vid);
  const venue = venueDetail.data;

  if (!venue) {
    return (
      <main className="text-center p-5">
        <h1 className="text-2xl font-bold">Venue Not Found</h1>
      </main>
    );
  }

  // แปลงลิงก์จาก download เป็น uc (อ่านภาพ) และลบ authuser ออก
  let imageUrl = venue.picture || "/img/bloom.jpg";
  if (imageUrl.includes("drive.usercontent.google.com/download")) {
    const urlParams = new URLSearchParams(imageUrl.split('?')[1]);
    const fileId = urlParams.get("id"); // ดึงแค่ ID ออกมา (1GJPsjTt8k-2ILv6A4ER1sRr6yTG_M2f5)
    
    // แปลงให้เป็นโดเมน drive.google.com ตามที่สไลด์อนุญาต
    imageUrl = `https://drive.google.com/uc?id=${fileId}`; 
  }

  return (
    <main className="text-center p-5">
      <h1 className="text-2xl font-bold mb-2">{venue.name}</h1>
      <div className="text-md text-gray-600 mb-4">Tel: {venue.tel}</div>
      
      {/* ใช้ Image ของ Next.js */}
      <Image 
        src={imageUrl} 
        alt={venue.name}
        width={800}
        height={500} 
        className="mx-auto w-full max-w-2xl h-auto rounded-lg shadow-lg object-cover" 
      />
    </main>
  );
}