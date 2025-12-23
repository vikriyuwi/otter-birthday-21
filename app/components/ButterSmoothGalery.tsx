'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

const images = [
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?q=80&w=2076&auto=format&fit=crop",
];

export default function ButterSmoothGalery() {
  return (
    <div className="flex flex-col bg-neutral-900 w-full">
      {images.map((src, i) => (
        <ParallaxImage key={i} src={src} index={i} />
      ))}
    </div>
  );
}

function ParallaxImage({ src, index }: { src: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  // 1. Track when this specific image enters/leaves the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    // Start tracking when the top of the div hits the bottom of screen
    // Stop tracking when the bottom of the div hits the top of screen
    offset: ["start end", "end start"]
  });

  // 2. Add physics smoothing (The "Sweet" Sauce)
  // This makes the animation lag slightly behind the scroll, creating weight.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3. Map scroll to movement
  // The image moves from -20% (top) to 20% (bottom) inside its container
  // creating the illusion that the image is "behind" the window.
  const y = useTransform(smoothProgress, [0, 1], ["-25%", "25%"]);
  
  // Optional: Text moves faster than the image for 3D depth
  const textY = useTransform(smoothProgress, [0, 1], ["50%", "-50%"]);
  const textOpacity = useTransform(smoothProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <section
      ref={ref}
      className="h-screen w-full relative flex items-center justify-center overflow-hidden"
    >
      {/* The Container is strictly 100vh.
        The Motion Div inside is TALLER (120%) so it has room to move.
      */}
      <motion.div 
        className="absolute inset-0 h-[120%] w-full -top-[10%]"
        style={{ y }}
      >
        <img
          src={src}
          alt={`Parallax ${index}`}
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </motion.div>

      {/* Floating Text Layer */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 text-center pointer-events-none"
      >
        <h2 className="text-8xl md:text-9xl font-bold text-white tracking-tighter drop-shadow-2xl mix-blend-overlay">
          MOMENT {index + 1}
        </h2>
        <p className="text-white/80 text-xl tracking-widest font-light mt-4 uppercase">
          Scroll Interaction
        </p>
      </motion.div>
    </section>
  );
}