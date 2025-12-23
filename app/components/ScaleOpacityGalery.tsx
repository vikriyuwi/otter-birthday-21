'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?q=80&w=2070&auto=format&fit=crop",
];

export default function ScaleOpacityGallery() {
  return (
    <div className="bg-black w-full">
      {images.map((src, i) => (
        <ScaleImage key={i} src={src} />
      ))}
    </div>
  );
}

function ScaleImage({ src }: { src: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Start tracking when top of element hits bottom of screen
    // End tracking when bottom of element hits top of screen
    offset: ["start end", "end start"]
  });

  // Animation Logic:
  // 0.0 = Entering from bottom
  // 0.5 = Exact center of screen
  // 1.0 = Leaving top
  
  // Scale: Starts at 0.8, grows to 1 in center, shrinks to 0.8 leaving
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  
  // Opacity: Starts at 0.3, becomes 1 in center, fades to 0.3 leaving
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <section
      ref={containerRef}
      className="h-screen w-full flex items-center justify-center overflow-hidden py-10" // added py-10 to prevent sticking edges
    >
      <motion.div
        style={{ scale, opacity }}
        className="w-full h-full relative origin-center"
      >
        <img
          src={src}
          alt="Focus Animation"
          className="w-full h-full object-cover rounded-2xl shadow-2xl" 
        />
        
        {/* Optional: Simple center text that also fades */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           {/* We can use the same opacity for text so it matches the image focus */}
           <h2 className="text-white text-5xl font-bold tracking-widest uppercase mix-blend-difference">
             Focus
           </h2>
        </div>
      </motion.div>
    </section>
  );
}