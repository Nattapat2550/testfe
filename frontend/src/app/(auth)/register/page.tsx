"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", tel: "", role: "user" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.tel) return setError("Please fill all fields.");
    if (formData.password.length < 6) return setError("Password must be at least 6 characters.");
    
    setLoading(true);
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
    
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData),
      });
      if (res.ok) router.push("/login");
      else {
        const data = await res.json();
        setError(data.message || "Failed to register");
      }
    } catch { 
      setError("Server connection error."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-[80vh] px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 w-full max-w-md flex flex-col gap-5">
        <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2 text-sm">Join us to make reservations instantly</p>
        </div>
        {error && <p className="text-red-500 bg-red-50 p-3 rounded-xl text-sm border border-red-100">{error}</p>}
        <input type="text" placeholder="Full Name" required className="p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="email" placeholder="Email Address" required className="p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" onChange={e => setFormData({...formData, email: e.target.value})} />
        <input type="text" placeholder="Telephone Number" required className="p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" onChange={e => setFormData({...formData, tel: e.target.value})} />
        <input type="password" placeholder="Password (Min. 6 chars)" required minLength={6} className="p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" onChange={e => setFormData({...formData, password: e.target.value})} />
        <button type="submit" disabled={loading} className="mt-2 bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-md disabled:bg-gray-400">
            {loading ? "Registering..." : "Sign Up"}
        </button>
        <p className="text-center text-sm text-gray-600 mt-2">Already have an account? <Link href="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link></p>
      </form>
    </main>
  );
}