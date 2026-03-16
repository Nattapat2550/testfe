"use client";
import { TextField, Button } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', tel: '', password: '', role: 'user' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("https://a08-venue-explorer-backend.vercel.app/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("Registration Successful! Please sign in.");
        router.push("/api/auth/signin");
      } else {
        const error = await res.json();
        alert(`Error: ${error.message || 'Failed to register'}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="w-full flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-8 shadow-md rounded-lg space-y-4">
        <TextField label="Name" fullWidth required onChange={(e) => setFormData({...formData, name: e.target.value})} />
        <TextField label="Email" type="email" fullWidth required onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <TextField label="Telephone" fullWidth required onChange={(e) => setFormData({...formData, tel: e.target.value})} />
        <TextField label="Password" type="password" fullWidth required onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <Button type="submit" variant="contained" color="primary" fullWidth className="mt-4">Register</Button>
      </form>
    </main>
  );
}