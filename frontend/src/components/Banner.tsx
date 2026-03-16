'use client'
import styles from './banner.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function Banner() {
  const router = useRouter();
  const { data: session } = useSession();
  const [index, setIndex] = useState(0);
  const images = [
    '/img/cover.jpg',
    '/img/cover2.jpg',
    '/img/cover3.jpg',
    '/img/cover4.jpg'
  ];

  return (
    <div className={styles.banner} onClick={() => setIndex((index + 1) % images.length)}>
      <img 
        src={images[index]} 
        alt="Event Venue" 
        className={styles.image} 
      />
      <div className={styles.overlay}>
        <h1 className={styles.title}>where every event finds its venue</h1>
        <p className={styles.subtitle}>
          Finding the perfect venue has never been easier. Whether it's a wedding, corporate event, or private party, we connecting people to the perfect place.
        </p>
      </div>

      {/* แสดงชื่อผู้ใช้ถ้า Log in แล้ว */}
      {session && (
         <div className="absolute top-6 right-6 z-30 font-semibold text-xl text-white">
           Welcome {session.user?.name}
         </div>
      )}

      <button 
        className="absolute bottom-6 right-6 bg-white text-cyan-600 border border-cyan-600 font-semibold py-2 px-4 rounded hover:bg-cyan-600 hover:text-white hover:border-transparent z-30"
        onClick={(e) => {
          e.stopPropagation(); 
          router.push('/venue');
        }}
      >
        Select Venue
      </button>
    </div>
  );
}