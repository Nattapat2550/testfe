export default async function userLogIn(userEmail: string, userPassword: string) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "https://a08-venue-explorer-backend.vercel.app";
    
    const response = await fetch(`${backendUrl}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to log in");
    }

    return await response.json();
}