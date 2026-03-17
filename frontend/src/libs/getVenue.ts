const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function getVenue(id: string) {
  const response = await fetch(`${BACKEND_URL}/api/v1/restaurants/${id}`, { next: { tags: ['venueDetail'], revalidate: 60 } });
  if (!response.ok) throw new Error("Failed to fetch venue detail");
  return await response.json();
}