const BACKEND_URL = "https://a08-venue-explorer-backend.vercel.app/api/v1";

// 5. แสดง Booking ที่สร้างไว้ (User View Own Booking / Admin View Any)
export async function getReservations(token: string) {
  const response = await fetch(`${BACKEND_URL}/reservations`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch reservations");
  return await response.json();
}

// 6 & 11. อัพเดท Booking (User Edit Own / Admin Edit Any)
export async function updateReservation(token: string, reservationId: string, data: any) {
  const response = await fetch(`${BACKEND_URL}/reservations/${reservationId}`, {
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

// 7 & 12. ลบ Booking (User Delete Own / Admin Delete Any)
export async function deleteReservation(token: string, reservationId: string) {
  const response = await fetch(`${BACKEND_URL}/reservations/${reservationId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to delete reservation");
  return await response.json();
}