import getVenue from "@/libs/getVenue";
import Image from "next/image"; // ถ้ามีรูป
import { Button } from "@mui/material";
import Link from "next/link";

export default async function VenueDetailPage({ params }: { params: { vid: string } }) {
  // 1. เรียกใช้ฟังก์ชัน getVenue โดยส่ง params.vid เข้าไป
  const venueDetail = await getVenue(params.vid);
  const venue = venueDetail.data;

  return (
    <main className="text-center p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-6">{venue.name}</h1>
      
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md flex flex-col space-y-4 text-left">
        {/* จำลองกล่องรูปภาพ */}
        <div className="w-full h-64 bg-slate-300 rounded-md mb-4 flex items-center justify-center text-gray-500">
          [Venue Image]
        </div>

        <p className="text-lg"><strong>Address:</strong> {venue.address}</p>
        <p className="text-lg"><strong>Tel:</strong> {venue.tel}</p>
        <p className="text-lg"><strong>Open:</strong> {venue.opentime} - {venue.closetime}</p>

        <Link href={`/booking?venueId=${venue._id}`}>
          <Button variant="contained" color="primary" className="mt-6 w-full py-3 text-lg font-semibold">
            Book This Venue
          </Button>
        </Link>
      </div>
    </main>
  );
}