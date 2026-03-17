// ไฟล์: src/libs/getUserProfile.tsx

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function getUserProfile(token: string) {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
        method: "GET",
        headers: {
            authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Cannot get user profile");
    }

    return await response.json();
}