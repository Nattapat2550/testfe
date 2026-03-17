const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default async function userLogIn(email: string, password: string) {
  const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  if (!response.ok) {
     const errData = await response.json().catch(() => ({}));
     throw new Error(`Failed to log in: ${response.status} - ${errData.message || 'Unknown error'}`);
  }
  const data = await response.json();
  
  const profileRes = await fetch(`${BACKEND_URL}/api/v1/auth/me`, {
    headers: { Authorization: `Bearer ${data.token}` }
  });
  
  if (!profileRes.ok) throw new Error("Failed to get profile");
  const profileData = await profileRes.json();

  return {
    _id: profileData.data._id,
    name: profileData.data.name,
    email: profileData.data.email,
    role: profileData.data.role,
    token: data.token,
  };
}