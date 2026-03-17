const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function getVenue(id: string) {
  try {
    // ใช้ cache: 'no-store' เพื่อบังคับดึงข้อมูลใหม่เสมอ ป้องกันปัญหา Vercel ค้าง
    const response = await fetch(`${BACKEND_URL}/api/v1/restaurants/${id}`, { 
      cache: 'no-store' 
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("GET VENUE ERROR:", error);
    throw error;
  }
}