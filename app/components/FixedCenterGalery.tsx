'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
];

export default function FixedCenterGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll of the entire container (which is very tall)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    // 1. THE TRACK:
    // Multiply height by number of images to create scroll distance.
    // e.g. 5 images = 500vh height.
    <div 
      ref={containerRef} 
      className="relative w-full"
      style={{ height: `${images.length * 100}vh` }}
    >
      
      {/* 2. THE VIEWPORT: 
          Sticks to the top of the screen. 
          The user scrolls "through" this time/space. 
      */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-black">
        {images.map((src, index) => (
          <ImageStack 
            key={index}
            src={src}
            index={index}
            total={images.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </div>
  );
}

// 3. THE IMAGE COMPONENT
function ImageStack({ 
  src, 
  index, 
  total, 
  progress 
}: { 
  src: string; 
  index: number; 
  total: number; 
  progress: MotionValue<number>; 
}) {
  
  // LOGIC: Calculate when this specific image should be visible.
  // We divide the total scroll progress (0 to 1) into segments for each image.
  
  // Example for 5 images:
  // Image 0 peaks at 0.0
  // Image 1 peaks at 0.25
  // Image 2 peaks at 0.5 ...
  const step = 1 / (total - 1);
  const myProgress = index * step;

  // OPACITY:
  // Fade IN from (myProgress - step) to myProgress
  // Fade OUT from myProgress to (myProgress + step)
  const opacity = useTransform(
    progress,
    [myProgress - step, myProgress, myProgress + step],
    [0, 1, 0]
  );

  // SCALE:
  // Incoming: Scale up from 0.5 to 1
  // Outgoing: Scale up from 1 to 1.5 (creating a "fly through" effect)
  const scale = useTransform(
    progress,
    [myProgress - step, myProgress, myProgress + step],
    [0.5, 1, 1.5]
  );

  // Z-INDEX: 
  // Ensure the active image is clickable/visible on top if needed, 
  // though opacity usually handles the visuals.
  const zIndex = useTransform(opacity, [0, 1], [0, 10]);

  return (
    <motion.div
      style={{ opacity, scale, zIndex }}
      className="absolute inset-0 w-full h-full flex items-center justify-center"
    >
      <img
        src={src}
        alt={`Slide ${index}`}
        className="w-full h-full object-cover"
      />
      
      {/* Optional Centered Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 className="text-white text-6xl md:text-8xl font-black tracking-tighter mix-blend-overlay">
          SLIDE {index + 1}
        </h2>
      </div>
    </motion.div>
  );
}