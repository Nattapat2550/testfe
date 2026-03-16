export default async function getVenues() {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://a08-venue-explorer-backend.vercel.app";
    
    const response = await fetch(`${backendUrl}/api/v1/restaurants`, {
        next: { tags: ['venues'] } // ใช้ cache ของ Next.js
    });

    if (!response.ok) {
        throw new Error("Failed to fetch venues");
    }

    return await response.json();
}