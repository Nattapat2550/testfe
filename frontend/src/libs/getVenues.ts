export default async function getVenues() {
  const response = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/restaurants", {
    next: { tags: ['venues'] } // ใช้ Next.js cache
  });
  if (!response.ok) throw new Error("Failed to fetch venues");
  return await response.json();
}