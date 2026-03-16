'use client'

import React, { ReactNode } from 'react';

export default function InteractiveCard({ children }: { children: ReactNode }) {
  function onMouseOver(e: React.SyntheticEvent) {
    e.currentTarget.classList.remove('shadow-lg', 'bg-white');
    e.currentTarget.classList.add('shadow-2xl', 'bg-neutral-200');
  }

  function onMouseOut(e: React.SyntheticEvent) {
    e.currentTarget.classList.remove('shadow-2xl', 'bg-neutral-200');
    e.currentTarget.classList.add('shadow-lg', 'bg-white');
  }

  return (
    <div 
      className="w-75 rounded-lg shadow-lg bg-white overflow-hidden transition-all"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      {children}
    </div>
  );
}