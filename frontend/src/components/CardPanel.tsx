'use client'
import { useReducer } from 'react';
import Card from './Card';
import Link from 'next/link';

type RatingAction = 
  | { type: 'SET_RATING'; venueName: string; rating: number }
  | { type: 'REMOVE_RATING'; venueName: string };

const ratingReducer = (state: Map<string, number>, action: RatingAction) => {
  switch (action.type) {
    case 'SET_RATING':
      return new Map(state).set(action.venueName, action.rating);
    case 'REMOVE_RATING':
      const newState = new Map(state);
      newState.delete(action.venueName);
      return newState;
    default:
      return state;
  }
};

export default function CardPanel() {
  const [ratingList, dispatch] = useReducer(ratingReducer, new Map<string, number>());

  const handleRatingChange = (venueName: string, rating: number) => {
    dispatch({ type: 'SET_RATING', venueName, rating });
  };

  const handleRemove = (venueName: string) => {
    dispatch({ type: 'REMOVE_RATING', venueName });
  };

  // สร้าง Mock ข้อมูลสถานที่จัดงาน
  const mockVenues = [
    { vid: "001", name: "The Bloom Pavilion", imgSrc: "/img/bloom.jpg" },
    { vid: "002", name: "Spark Space", imgSrc: "/img/sparkspace.jpg" },
    { vid: "003", name: "The Grand Table", imgSrc: "/img/grandtable.jpg" },
  ];

  return (
    <div className="w-full">
      <div style={{ marginTop: '80px' }} className="flex flex-row justify-evenly items-center flex-wrap w-full max-w-300 mx-auto">
        {mockVenues.map((venue) => (
          <Link href={`/venue/${venue.vid}`} key={venue.vid}>
            <Card 
              venueName={venue.name} 
              imgSrc={venue.imgSrc} 
              onRatingChange={handleRatingChange} 
            />
          </Link>
        ))}
      </div>
      
      {/* ส่วนแสดงรายการที่ถูก Rating */}
      <div className="mt-10 p-5 text-center">
        <h3 className="text-xl font-semibold mb-4">Venue List with Ratings: {ratingList.size}</h3>
        {Array.from(ratingList.entries()).map(([venueName, rating]) => (
          <div 
            key={venueName} 
            data-testid={venueName} 
            onClick={() => handleRemove(venueName)}
            className="cursor-pointer text-lg hover:font-bold mb-2"
          >
            {venueName}: {rating}
          </div>
        ))}
      </div>
    </div>
  );
}