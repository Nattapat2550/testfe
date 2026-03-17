// ไฟล์: src/libs/getVenue.ts
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function getVenue(id: string) {
  // บังคับไม่ให้ Vercel จำ Cache เก่าที่เคยพัง (no-store)
  const response = await fetch(`${BACKEND_URL}/api/v1/restaurants/${id}`, { 
    cache: 'no-store' 
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch venue: ${response.status}`);
  }
  
  return await response.json();
}