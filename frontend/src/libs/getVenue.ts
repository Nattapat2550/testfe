export default async function getVenue(id: string) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://a08-venue-explorer-backend.vercel.app";
    
    // ยิง API ไปที่ /restaurants/:id
    const response = await fetch(`${backendUrl}/api/v1/restaurants/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch venue detail");
    }

    return await response.json();
}