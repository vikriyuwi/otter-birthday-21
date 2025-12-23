"use client";

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const data = [
  {
    id: 1,
    headline: <h2 className="text-5xl font-bold text-cyan-400">The Vision</h2>,
    body: <p className="text-gray-400 mt-4 max-w-md">We start with a blank canvas, waiting for the scroll to bring life to the interface.</p>,
    color: "bg-slate-900"
  },
  {
    id: 2,
    headline: <h2 className="text-5xl font-bold text-rose-500">The Motion</h2>,
    body: <p className="text-gray-400 mt-4 max-w-md">Elements don't just appear; they dance into place using physics-based spring animations.</p>,
    color: "bg-zinc-900"
  },
  {
    id: 3,
    headline: <h2 className="text-5xl font-bold text-amber-400">The Depth</h2>,
    body: <p className="text-gray-400 mt-4 max-w-md">By varying the speeds of layers, we create a 3D sense of immersion on a 2D screen.</p>,
    color: "bg-neutral-900"
  }
];

export default function ParallaxView() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smoothing the scroll progress for a premium "heavy" feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main ref={containerRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {data.map((item, index) => (
          <ParallaxLayer 
            key={item.id} 
            item={item} 
            index={index} 
            progress={smoothProgress} 
            total={data.length} 
          />
        ))}
        
        {/* Progress Indicator */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
           {data.map((_, i) => (
             <Dot key={i} index={i} progress={smoothProgress} total={data.length} />
           ))}
        </div>
      </div>
    </main>
  );
}

function ParallaxLayer({ item, index, progress, total }: any) {
  const start = index / total;
  const end = (index + 1) / total;

  // 1. Zoom out effect
  const scale = useTransform(progress, [start, end], [1.2, 1]);
  // 2. Opacity fade
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0]);
  // 3. Different movement speeds (Parallax)
  const headlineX = useTransform(progress, [start, end], [100, -100]);
  const bodyX = useTransform(progress, [start, end], [-100, 100]);

  return (
    <motion.div
      style={{ opacity, scale }}
      className={`absolute inset-0 flex flex-col items-center justify-center ${item.color}`}
    >
      <motion.div style={{ x: headlineX }} className="z-20">
        {item.headline}
      </motion.div>
      <motion.div style={{ x: bodyX }} className="z-10 text-center px-6">
        {item.body}
      </motion.div>
    </motion.div>
  );
}

function Dot({ index, progress, total }: any) {
  const start = index / total;
  const end = (index + 1) / total;
  
  const width = useTransform(progress, [start, (start + end) / 2, end], [8, 24, 8]);
  const opacity = useTransform(progress, [start, (start + end) / 2, end], [0.3, 1, 0.3]);

  return (
    <motion.div 
      style={{ width, opacity }}
      className="h-2 rounded-full bg-white" 
    />
  );
}