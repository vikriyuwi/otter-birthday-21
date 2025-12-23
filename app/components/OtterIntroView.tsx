import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Props {
  imageSrc: string;
  children?: React.ReactNode;
  className?: string;
}

const OtterIntroView: React.FC<Props> = ({ 
  imageSrc, 
  children, 
  className = "h-[100vh]" 
}) => {
  // 1. Ref to track this specific section
  const containerRef = useRef<HTMLDivElement>(null);

  // 2. Setup scroll tracking for ONLY this element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.5]);

  return (
    <div
      ref={containerRef}
      // [clip-path:inset(0)] is essential: 
      // It forces the 'fixed' image to be visible ONLY inside this container's boundaries.
      className={`relative w-full overflow-hidden [clip-path:inset(0)] ${className}`}
    >
      {/* The Background Image */}
      <motion.div
        style={{ scale }} // Apply the Framer Motion scale
        className="fixed top-0 left-0 w-full h-full"
      >
        <img
          src={imageSrc}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* The Content Overlay */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default OtterIntroView;