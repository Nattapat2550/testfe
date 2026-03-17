import getVenue from "@/libs/getVenue";
import BookingForm from "@/components/BookingForm";

export default async function VenueDetailPage({ params }: { params: { vid: string } }) {
  const venueDetail = await getVenue(params.vid);
  const venue = venueDetail.data;

  return (
    <main className="p-6 md:p-12 max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 mt-4">
      <div className="flex-1">
        <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase mb-4 inline-block">Restaurant Detail</span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">{venue.name}</h1>
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-gray-700 space-y-5 text-lg">
          <div className="flex items-start gap-4"><span className="text-2xl">📍</span><p><strong>Address:</strong><br/>{venue.address}</p></div>
          <div className="flex items-start gap-4"><span className="text-2xl">📞</span><p><strong>Telephone:</strong><br/>{venue.tel}</p></div>
          <div className="flex items-start gap-4"><span className="text-2xl">🕒</span><p><strong>Operating Hours:</strong><br/>{venue.opentime} - {venue.closetime}</p></div>
        </div>
      </div>
      <div className="flex-1 lg:max-w-md w-full">
        <BookingForm restaurantId={venue._id} />
      </div>
    </main>
  );
}