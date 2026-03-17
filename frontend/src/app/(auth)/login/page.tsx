"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) {
        setError("Invalid email or password");
        setLoading(false);
    }
    else { 
        router.push("/"); 
        router.refresh(); 
    }
  };

  return (
    <main className="flex justify-center items-center min-h-[80vh] px-4">
      <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100 w-full max-w-md flex flex-col gap-5">
        <div className="text-center mb-2">
            <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-500 mt-2 text-sm">Please log in to your account</p>
        </div>
        {error && <p className="text-red-500 bg-red-50 p-3 rounded-xl text-sm border border-red-100">{error}</p>}
        <input type="email" placeholder="Email Address" required className="p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="p-4 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition" onChange={e => setPassword(e.target.value)} />
        <button type="submit" disabled={loading} className="mt-2 bg-gray-900 text-white p-4 rounded-xl font-bold hover:bg-blue-600 transition shadow-md disabled:bg-gray-400">
            {loading ? "Signing in..." : "Sign In"}
        </button>
        <p className="text-center text-sm text-gray-600 mt-2">New here? <Link href="/register" className="text-blue-600 font-semibold hover:underline">Create an account</Link></p>
      </form>
    </main>
  );
}