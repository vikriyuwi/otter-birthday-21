'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2074&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1501854140884-074bf8363275?q=80&w=2070&auto=format&fit=crop",
];

export default function ScrollGallery() {
  return (
    // Just a wrapper, no height/overflow constraints
    <div className="flex flex-col bg-black">
      {images.map((src, index) => (
        <ImageSection key={index} src={src} index={index} />
      ))}
    </div>
  );
}

function ImageSection({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // useScroll defaults to the window/viewport when no container is specified
  const { scrollYProgress } = useScroll({
    target: ref,
    // "start start": when element top hits viewport top
    // "end start": when element bottom hits viewport top
    offset: ["start start", "end start"] 
  });

  // Parallax effect: The image moves slower than the scroll
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  
  // Opacity fade: Fades out as it scrolls up and out of view
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Scale effect: Slightly zooms out as it leaves
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <section
      ref={ref}
      className="h-screen w-full relative flex items-center justify-center overflow-hidden"
    >
      {/* This div is the animated layer. 
        We separate it so the section container (ref) stays fixed in the DOM flow 
        while the inner content moves visually.
      */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={src}
          alt={`Slide ${index + 1}`}
          className="object-cover w-full h-full"
        />
        
        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-white text-5xl font-bold drop-shadow-lg">
            Image {index + 1}
          </h2>
        </div>
      </motion.div>
    </section>
  );
}