"use client";

import React, { useState, useEffect, useRef } from 'react';
import { BrickBlock } from './brick-block';

export function ResponsiveBrickFloor() {
  const [numBricks, setNumBricks] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const brickWidth = 64; // Corresponds to h-16

  useEffect(() => {
    const calculateBricks = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newNumBricks = Math.ceil(containerWidth / brickWidth);
        setNumBricks(newNumBricks);
      }
    };

    calculateBricks();
    window.addEventListener('resize', calculateBricks);
    
    return () => window.removeEventListener('resize', calculateBricks);
  }, []);

  return (
    <div ref={containerRef} className="absolute bottom-0 left-0 w-full z-10 flex">
      {numBricks > 0 && [...Array(numBricks)].map((_, i) => (
        <BrickBlock key={i} className="h-16 flex-grow" style={{ flexBasis: `${brickWidth}px` }} />
      ))}
    </div>
  );
}
