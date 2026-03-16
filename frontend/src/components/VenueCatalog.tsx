import Link from "next/link";
import Card from "./Card"; // นำเข้า Card component

export default function VenueCatalog({ venuesJson }: { venuesJson: any }) {
  // venuesJson.data คืออาร์เรย์ของ venues ที่มาจาก API
  return (
    <div className="flex flex-row flex-wrap justify-center gap-4">
      {venuesJson.data.map((venue: any) => (
        <Link 
          href={`/venue/${venue.id}`} 
          key={venue.id} 
          className="w-full sm:w-[45%] md:w-[30%] block"
        >
          {/* เรียกใช้ Card แทนการเขียน img ตรงๆ */}
          <Card 
            venueName={venue.name} 
            imgSrc={venue.picture || "/img/bloom.jpg"} 
          />
        </Link>
      ))}
    </div>
  );
}