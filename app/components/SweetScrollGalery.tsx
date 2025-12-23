'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1519681393798-38e43269d877?q=80&w=2070&auto=format&fit=crop", // A moody mountain
  "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop", // Deep desert
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop", // Misty lake
  "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop", // Texture
];

export default function SweetScrollGallery() {
  const containerRef = useRef(null);

  // We track the scroll progress of the entire container to pass down to children if needed,
  // but here we mainly use the container to create spacing.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={containerRef} className="w-full relative">
      {images.map((src, index) => {
        // We create a "target scale" so the first card shrinks the most, 
        // and the last card doesn't shrink at all.
        const targetScale = 1 - ((images.length - index) * 0.05);
        
        return (
          <Card 
            key={index} 
            i={index} 
            src={src} 
            progress={scrollYProgress}
            range={[index * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

interface CardProps {
  i: number;
  src: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card = ({ i, src, progress, range, targetScale }: CardProps) => {
  const container = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: container,
    // "start start": When the card top hits the viewport top
    // "end end": When the card bottom hits the viewport bottom (used for tracking exit)
    offset: ['start end', 'start start']
  });

  // Calculate the scaling based on the parent's total scroll progress
  // This ensures the cards scale smoothly as a group
  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div 
      ref={container} 
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div 
        style={{ 
          scale,
          // Creates the "stacking" look - cards further down are slightly lower z-index until they arrive
          top: `calc(-5vh + ${i * 25}px)` 
        }} 
        className="relative w-full h-full origin-top"
      >
        <div className="relative w-full h-full overflow-hidden bg-black">
           {/* Image Container */}
          <motion.div className="w-full h-full relative">
            <img 
              src={src}
              alt={`image_${i}`}
              className="object-cover w-full h-full"
            />
          </motion.div>

          {/* Darkening Overlay: Gets darker as the card gets pushed back */}
          {/* Note: We rely on the next card covering this one, but a subtle shadow helps depth */}
          <motion.div 
            className="absolute inset-0 bg-black pointer-events-none"
            style={{ opacity: useTransform(progress, range, [0, 0.3]) }} 
          />
          
          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
            <h2 className="text-white text-6xl md:text-8xl font-black uppercase tracking-tighter mix-blend-overlay">
              Sweet
            </h2>
            <p className="text-white/80 text-xl mt-4 font-light tracking-widest uppercase">
              Collection 0{i + 1}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};