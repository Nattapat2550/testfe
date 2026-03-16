const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://a08-venue-explorer-backend.vercel.app";

// ดึงการจองทั้งหมด (ถ้า user ธรรมดาจะได้แค่ของตัวเอง, ถ้า admin จะได้ทั้งหมด)
export async function getReservations(token: string) {
  const response = await fetch(`${backendUrl}/api/v1/reservations`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch reservations");
  return await response.json();
}

// อัปเดตข้อมูลการจอง
export async function updateReservation(token: string, reservationId: string, data: any) {
  const response = await fetch(`${backendUrl}/api/v1/reservations/${reservationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update reservation");
  return await response.json();
}

// ลบการจอง
export async function deleteReservation(token: string, reservationId: string) {
  const response = await fetch(`${backendUrl}/api/v1/reservations/${reservationId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete reservation");
  return await response.json();
}