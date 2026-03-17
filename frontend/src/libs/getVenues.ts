const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function getVenues() {
  const response = await fetch(`${BACKEND_URL}/api/v1/restaurants`, { next: { tags: ['venues'], revalidate: 60 } });
  if (!response.ok) throw new Error("Failed to fetch venues");
  return await response.json();
}