import getVenues from "@/libs/getVenues";
import Link from "next/link";

export default async function VenuePage() {
  const venues = await getVenues();

  return (
    <main className="p-6 md:p-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Select a Restaurant</h1>
        <p className="text-gray-500">Explore our curated list of top dining spots</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {venues.data.map((venue: any) => (
          <Link href={`/venue/${venue._id}`} key={venue._id} className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 flex flex-col group">
            <div className="flex-grow">
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