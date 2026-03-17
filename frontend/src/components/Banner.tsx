'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Banner() {
  const router = useRouter();
  const { data: session } = useSession();
  const [index, setIndex] = useState(0);
  
  // ใช้รูปภาพร้านอาหารที่มีในโฟลเดอร์ public/img ของคุณ
  const images = [
    '/img/grandtable.jpg',
    '/img/bloom.jpg',
    '/img/sparkspace.jpg',
    '/img/cover.jpg'
  ];

  return (
    <div 
      className="relative w-full h-[85vh] cursor-pointer overflow-hidden group" 
      onClick={() => setIndex((index + 1) % images.length)}
    >
      <Image 
        src={images[index]} 
        alt="Restaurant Venue" 
        fill
        className="object-cover transition-opacity duration-700 ease-in-out" 
        priority
      />
      
      {/* Overlay พื้นหลังดำจางๆ เพื่อให้ตัวหนังสืออ่านง่าย */}
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center p-6 transition-all duration-300">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-xl tracking-tight">
          Savor the <span className="text-primary-500">Perfect Moment</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-100 max-w-2xl drop-shadow-md font-light">
          Discover top-rated restaurants, exquisite menus, and secure your table for an unforgettable dining experience.
        </p>
      </div>

      {/* แสดงชื่อผู้ใช้ถ้า Log in แล้ว */}
      {session && (
         <div className="absolute top-8 right-8 z-30 font-medium text-white bg-black/30 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-lg">
           Welcome, {session.user?.name}
         </div>
      )}

      {/* ปุ่ม Call to Action */}
      <button 
        className="absolute bottom-12 right-12 bg-primary-600 text-white font-bold py-3 px-8 rounded-full hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30 hover:-translate-y-1 transition-all duration-300 z-30"
        onClick={(e) => {
          e.stopPropagation(); 
          router.push('/venue');
        }}
      >
        Find a Table
      </button>
    </div>
  );
}