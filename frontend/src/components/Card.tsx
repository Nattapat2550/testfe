import React from 'react';
import InteractiveCard from './InteractiveCard';
import { Rating } from '@mui/material';
import Image from 'next/image'; // เพิ่ม import

export default function Card({ 
  venueName, 
  imgSrc, 
  onRatingChange 
}: { 
  venueName: string, 
  imgSrc: string,
  onRatingChange?: (venueName: string, rating: number) => void
}) {
  return (
    <InteractiveCard>
      {/* เปลี่ยน img เป็น Image ของ Next.js */}
      <Image 
        src={imgSrc} 
        alt={venueName} 
        width={500}
        height={300}
        className="w-full h-50 object-cover" 
      />
      <div className="p-4 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">{venueName}</h2>
        {/* แสดง Rating ก็ต่อเมื่อมีการส่ง prop onRatingChange เข้ามา */}
        {onRatingChange && (
          <div 
            className="mt-2"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault(); // ป้องกันไม่ให้ทะลุไปทริกเกอร์การ navigate ของ <Link>
            }}
          >
            <Rating
              data-testid={`${venueName} Rating`}
              name={`${venueName} Rating`}
              onChange={(event, newValue) => {
                if (newValue !== null) {
                  onRatingChange(venueName, newValue);
                }
              }}
            />
          </div>
        )}
      </div>
    </InteractiveCard>
  );
}