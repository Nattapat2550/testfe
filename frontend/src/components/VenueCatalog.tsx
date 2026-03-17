import Link from "next/link";
import Card from "./Card";

export default function VenueCatalog({ venuesJson }: { venuesJson: any }) {
  if (!venuesJson || !venuesJson.data) return null;

  return (
    <div className="flex flex-row flex-wrap justify-center gap-6">
      {venuesJson.data.map((venue: any) => (
        <Link 
          // ใช้ venue.id หรือ venue._id เพื่อให้ชัวร์ว่าตรงกับฐานข้อมูล
          href={`/venue/${venue.id || venue._id}`} 
          key={venue.id || venue._id} 
          className="w-full sm:w-[45%] md:w-[30%] block hover:scale-105 transition-transform duration-300"
        >
          <Card 
            venueName={venue.name} 
            imgSrc={venue.picture || "/img/bloom.jpg"} 
          />
        </Link>
      ))}
    </div>
  );
}