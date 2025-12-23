"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const content = [
  {
    icon: "🍀",
    headline: "Overflowing Joy",
    body: "May your days be filled with endless love and perfect peace.",
  },
  {
    icon: "🦁",
    headline: "Strength & Health",
    body: "I pray for your wellness and for every one of your prayers to be answered.",
  },
  {
    icon: "🌻",
    headline: "No More Heavy Days",
    body: "I wish for the end of any sadness, only light from here on out.",
  },
  {
    icon: "❤️",
    headline: "Our Forevermore",
    body: "My biggest wish is to stay by your side through it all.",
  }
];

export default function CinematicScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main ref={containerRef} className="relative h-[400vh] bg-theme-green">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {content.map((item, index) => (
          <RevealSection 
            key={index} 
            item={item} 
            index={index} 
            progress={smoothProgress} 
            total={content.length} 
          />
        ))}
      </div>
    </main>
  );
}

function RevealSection({ item, index, progress, total }: any) {
  const start = index / total;
  const end = (index + 1) / total;

  // Background appearance
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, end], [1.2, 1]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className={`absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br ${item.bg} px-40`}
    >
      <div className="max-w-4xl text-center">
        <motion.h2 
          className="text-6xl md:text-8xl text-black font-black tracking-tighter mb-6 font-serif whitespace-pre-line"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.8 }}
        >
          {item.headline}
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-black/50 font-light italic"
        >
          {item.body}
        </motion.p>

        <motion.h2 
          className="text-4xl md:text-6xl text-black font-black tracking-tighter mt-20 font-serif whitespace-pre-line"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.8 }}
        >
          {item.icon}
        </motion.h2>
      </div>
    </motion.div>
  );
}