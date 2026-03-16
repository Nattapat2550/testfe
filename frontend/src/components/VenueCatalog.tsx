import Link from 'next/link';
import { Card, CardContent, Typography } from '@mui/material';

export default function VenueCatalog({ venuesJson }: { venuesJson: any }) {
  if (!venuesJson || !venuesJson.data) return null;

  return (
    <div className="flex flex-wrap justify-center gap-6 p-5">
      {venuesJson.data.map((venue: any) => (
        <Link href={`/venue/${venue.id}`} key={venue.id} className="w-full sm:w-[45%] md:w-[30%]">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer h-full">
            {/* สมมติว่ามีรูป ถ้าไม่มีใช้กล่องสีเทาแทน */}
            <div className="h-48 bg-slate-300 w-full rounded-t-md"></div>
            <CardContent>
              <Typography variant="h6" component="div" className="font-bold">{venue.name}</Typography>
              <Typography variant="body2" color="text.secondary">{venue.address}</Typography>
              <Typography variant="body2" className="mt-2 text-blue-600">Tel: {venue.tel}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}