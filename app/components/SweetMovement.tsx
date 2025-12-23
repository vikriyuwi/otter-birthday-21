"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const data = [
  {
    title: "ELEGANCE",
    desc: "Refined movements for modern interfaces.",
    color: "#0f172a", // slate-900
    accent: "text-cyan-400"
  },
  {
    title: "FLUIDITY",
    desc: "Seamless transitions between states.",
    color: "#1e1b4b", // indigo-950
    accent: "text-rose-400"
  },
  {
    title: "CRAFT",
    desc: "Attention to every pixel and frame.",
    color: "#171717", // neutral-900
    accent: "text-amber-400"
  }
];

export default function SweetMovementView() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoothing out the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  // Animating the background color based on scroll
  const bgColor = useTransform(
    smoothProgress,
    [0, 0.5, 1],
    [data[0].color, data[1].color, data[2].color]
  );

  return (
    <motion.main 
      style={{ backgroundColor: bgColor }} 
      ref={containerRef} 
      className="relative h-[400vh] transition-colors duration-700"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {data.map((item, index) => (
          <Section 
            key={index} 
            item={item} 
            index={index} 
            progress={smoothProgress} 
            total={data.length} 
          />
        ))}
      </div>
    </motion.main>
  );
}

interface SectionProps {
  item: typeof data[0];
  index: number;
  progress: any;
  total: number;
}

function Section({ item, index, progress, total }: SectionProps) {
  const start = index / total;
  const end = (index + 1) / total;

  // Animation values
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const textY = useTransform(progress, [start, start + 0.15, end - 0.1, end], [100, 0, 0, -100]);
  const descY = useTransform(progress, [start, start + 0.2, end - 0.1, end], [100, 0, 0, -80]);
  const letterSpacing = useTransform(progress, [start, end], ["0.5em", "0em"]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
    >
      {/* Masking the Headline */}
      <div className="overflow-hidden mb-2">
        <motion.h2
          style={{ y: textY, letterSpacing }}
          className={`text-7xl md:text-9xl font-black italic tracking-tighter ${item.accent}`}
        >
          {item.title}
        </motion.h2>
      </div>

      {/* Masking the Body Text */}
      <div className="overflow-hidden">
        <motion.p
          style={{ y: descY }}
          className="text-white/60 text-lg md:text-2xl font-light tracking-wide"
        >
          {item.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}