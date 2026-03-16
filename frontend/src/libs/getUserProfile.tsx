export default async function getUserProfile(token: string) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://a08-venue-explorer-backend.vercel.app";
    
    const response = await fetch(`${backendUrl}/api/v1/auth/me`, {
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